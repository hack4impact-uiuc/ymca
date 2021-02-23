// @flow

/* eslint-disable no-console */

import axios from 'axios';

import type { Category, HomePage, Resource } from '../types/models';
import type { ApiResponse } from '../types/apiResponse';

const instance = axios.create({
  //baseURL: 'https://nawc-staging.vercel.app',
   baseURL: 'http://localhost:9000',
});

export const imageToLink = (
  image: ?(string | ArrayBuffer),
): ApiResponse<string> => {
  const requestExtension = 'api/admin/imageUpload';
  return instance
    .post(
      requestExtension,
      { image },
      {
        headers: {
          token: localStorage.getItem('token'),
        },
      },
    )
    .then(
      (res) => res.data,
      (err) => {
        console.error(err);
        return null;
      },
    );
};

export const getHomePage = (): ApiResponse<HomePage> =>
  instance.get('/api/homepage').then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    },
  );

export const editHomePage = (homepage: HomePage): ApiResponse<void> => {
  const requestExtension = '/api/admin/homepage';
  return instance
    .put(requestExtension, homepage, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
    .then(
      (res) => res.data,
      (err) => {
        console.error(err);
        return null;
      },
    );
};

export const createHomePage = (homepage: HomePage): ApiResponse<HomePage> => {
  const requestExtension = '/api/admin/homepage';
  return instance
    .post(requestExtension, homepage, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
    .then(
      (res) => res.data,
      (err) => {
        console.error(err);
        return null;
      },
    );
};

export const getCategories = (): ApiResponse<Array<Category>> =>
  instance.get('/api/categories').then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    },
  );

export const getResources = (): ApiResponse<Array<Resource>> =>
  instance.get('/api/resources').then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    },
  );

export const getResourcesByCategory = (
  category: string,
): ApiResponse<Array<Resource>> => {
  const requestExtension = `/api/resources?category=${category}`;
  return instance.get(requestExtension).then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    },
  );
};

export const getResourceByID = (
  id: string,
  needLatLong: boolean,
): ApiResponse<Resource> => {
  const boolString = needLatLong.toString();
  const requestExtension = `/api/resources/${id}?requireLatLong=${boolString}`;
  return instance.get(requestExtension).then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    },
  );
};

export const addResource = (resource: Resource): ApiResponse<Resource> =>
  instance
    .post('/api/admin/resources', resource, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
    .then(
      (res) => res.data,
      (err) => {
        console.error(err);
        return null;
      },
    );

export const editResource = (
  id: string,
  resource: Resource,
): ApiResponse<Resource> => {
  const requestExtension = `/api/admin/resources/${id}`;
  return instance
    .put(requestExtension, resource, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
    .then(
      (res) => res.data,
      (err) => {
        console.error(err);
        return null;
      },
    );
};

export const deleteResource = (id: string): ApiResponse<null> => {
  const requestExtension = `/api/admin/resources/${id}`;
  return instance
    .delete(requestExtension, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
    .then(
      (res) => res.data,
      (err) => {
        console.error(err);
        return null;
      },
    );
};

export const addCategory = (category: Category): ApiResponse<Category> =>
  instance
    .post('/api/admin/categories', category, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
    .then(
      (res) => res.data,
      (err) => {
        console.error(err);
        return null;
      },
    );

export const editCategory = (
  id: string,
  category: Category,
): ApiResponse<Category> => {
  const requestExtension = `/api/admin/categories/${id}`;
  return instance
    .put(requestExtension, category, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
    .then(
      (res) => res.data,
      (err) => {
        console.error(err);
        return null;
      },
    );
};

export const deleteCategory = (id: string): ApiResponse<null> => {
  const requestExtension = `/api/admin/categories/${id}`;
  return instance
    .delete(requestExtension, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
    .then(
      (res) => res.data,
      (err) => {
        console.error(err);
        return null;
      },
    );
};

export const addSubcategory = (
  id: string,
  category: Category
): ApiResponse<Category> =>
  instance
    .post(`/api/admin/subcategories/${id}`, category, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
    .then(
      (res) => res.data,
      (err) => {
        console.error(err);
        return null;
      },
    );

export const editSubcategory = (
  id: string,
  category: Category,
): ApiResponse<Category> => {
  const requestExtension = `/api/admin/subcategories/${id}`;
  return instance
    .put(requestExtension, category, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
    .then(
      (res) => res.data,
      (err) => {
        console.error(err);
        return null;
      },
    );
};

export const deleteSubcategory = (id: string): ApiResponse<Category> => {
  const requestExtension = `/api/admin/subcategories/${id}`;
  return instance
    .delete(requestExtension, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
    .then(
      (res) => res.data,
      (err) => {
        console.error(err);
        return null;
      },
    );
};