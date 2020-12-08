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

import { verify, getAllRoles } from './auth';

type ProvideAuthParams = {
  children: React.Node,
};

type Auth = {
  authed: ?boolean,
  authRoleIsEquivalentTo: string => ?boolean,
  setAuthed: (?boolean) => void,
  setAuthRole: (?string) => void,
};

// Provider hook that creates auth object and handles state
function useProvideAuth(): Auth {
  const [authed, setAuthed] = useState<?boolean>(null);
  const [authRole, setAuthRole] = useState<?string>(null);
  const [authRoles, setAuthRoles] = useState<?Array<string>>(null);

  useEffect(() => {
    async function fetchData() {
      Promise.all([
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
      ]).then(vals => setAuthRoles(Object.keys(vals[0].roles).concat('')));
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

  return {
    authed,
    authRoleIsEquivalentTo,
    setAuthed,
    setAuthRole,
  };
}

const defaultContext: Auth = {
  authed: null,
  authRoleIsEquivalentTo: () => null,
  setAuthed: () => {},
  setAuthRole: () => {},
};

const authContext = createContext<Auth>(defaultContext);

// Hook for child components to get the auth object
export const useAuth = () => {
  return useContext(authContext);
};

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }: ProvideAuthParams) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
