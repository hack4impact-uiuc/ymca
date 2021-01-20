// @flow

// code inspired from https://usehooks.com/useAuth/
import * as React from 'react';
import {
  useCallback,
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react';

import {
  login as loginHelper,
  getSecurityQuestions,
  register as registerHelper,
  resetPassword as resetPasswordHelper,
  verify,
  getAllRoles,
} from './auth';

type ProvideAuthParams = {
  children: React.Node,
};

type Auth = {
  authed: ?boolean,
  authRoleIsEquivalentTo: string => ?boolean,
  login: ({ email: string, password: string }) => Promise<?string>,
  logout: () => void,
  register: ({
    email: string,
    password: string,
    questionIdx: string,
    answer: string,
  }) => Promise<?string>,
  resetPassword: ({
    email: string,
    password: string,
    answer: string,
  }) => Promise<?string>,
  securityQuestions: Array<string>,
};

// Provider hook that creates auth object and handles state
function useProvideAuth(): Auth {
  const [authed, setAuthed] = useState<?boolean>(null);
  const [authRole, setAuthRole] = useState<?string>(null);
  const [authRoles, setAuthRoles] = useState<?Array<string>>(null);
  const [securityQuestions, setSecurityQuestions] = useState<Array<string>>([]);

  useEffect(() => {
    async function fetchData() {
      Promise.all([
        getSecurityQuestions(),
        getAllRoles(),
        verify(
          res => {
            setAuthed(true);
            setAuthRole(res.role);
          },
          () => {
            setAuthed(false);
            setAuthRole('');
          },
        ),
      ]).then(vals => {
        setSecurityQuestions(vals[0].questions);
        setAuthRoles(Object.keys(vals[1].roles).concat(''));
      });
    }
    fetchData();
  }, []);

  const authRoleIsEquivalentTo = useCallback(
    role => {
      if (authRole == null || authRoles == null) {
        return null;
      }
      return (
        authRoles.indexOf(authRole.toLowerCase()) <=
        authRoles.indexOf(role.toLowerCase())
      );
    },
    [authRole, authRoles],
  );

  const authUser = res => {
    if (res.status === 200) {
      localStorage.setItem('token', res.token);
      setAuthed(true);
      setAuthRole(res.permission);
      return null;
    }
    return res.message;
  };

  const register = async params => {
    const res = await registerHelper(params);
    return authUser(res);
  };

  const resetPassword = async params => {
    const res = await resetPasswordHelper(params);
    return authUser(res);
  };

  const login = async params => {
    const res = await loginHelper(params);
    return authUser(res);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthed(false);
    setAuthRole('');
  };

  return {
    authed,
    authRoleIsEquivalentTo,
    login,
    logout,
    register,
    resetPassword,
    securityQuestions,
  };
}

const defaultContext: Auth = {
  authed: null,
  authRoleIsEquivalentTo: () => null,
  login: () => new Promise(() => {}),
  logout: () => {},
  register: () => new Promise(() => {}),
  resetPassword: () => new Promise(() => {}),
  securityQuestions: [],
};

const authContext = createContext<Auth>(defaultContext);

// Hook for child components to get the auth object
export const useAuth = () => useContext(authContext);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }: ProvideAuthParams) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
