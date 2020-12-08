//@flow

/* eslint-disable no-console */

import type { Category, HomePage, Resource } from '../types/models';

import axios from 'axios';

type ApiResponse<T> = Promise<{
  code: number,
  message: string,
  success: boolean,
  result: T,
}>;

const instance = axios.create({
  baseURL: 'https://nawc.now.sh',
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
      res => res.data,
      err => {
        console.error(err);
        return null;
      },
    );
};

export const getHomePage = (): ApiResponse<HomePage> => {
  return instance.get('/api/homepage').then(
    res => res.data,
    err => {
      console.error(err);
      return null;
    },
  );
};

export const editHomePage = (homepage: HomePage): ApiResponse<void> => {
  const requestExtension = '/api/admin/homepage';
  return instance
    .put(requestExtension, homepage, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
    .then(
      res => res.data,
      err => {
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
      res => res.data,
      err => {
        console.error(err);
        return null;
      },
    );
};

export const getCategories = (): ApiResponse<Array<Category>> => {
  return instance.get('/api/categories').then(
    res => res.data,
    err => {
      console.error(err);
      return null;
    },
  );
};

export const getResources = (): ApiResponse<Array<Resource>> => {
  return instance.get('/api/resources').then(
    res => res.data,
    err => {
      console.error(err);
      return null;
    },
  );
};

export const getResourcesByCategory = (
  category: string,
): ApiResponse<Array<Resource>> => {
  const requestExtension = `/api/resources?category=${category}`;
  return instance.get(requestExtension).then(
    res => res.data,
    err => {
      console.error(err);
      return null;
    },
  );
};

export const getResourceByID = (
  id: string,
  needLatLong: boolean,
): ApiResponse<Resource> => {
  const requestExtension = `/api/resources/${id}?requireLatLong=${needLatLong.toString()}`;
  return instance.get(requestExtension).then(
    res => res.data,
    err => {
      console.error(err);
      return null;
    },
  );
};

export const addResource = (resource: Resource): ApiResponse<Resource> => {
  return instance
    .post('/api/admin/resources', resource, {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
    .then(
      res => res.data,
      err => {
        console.error(err);
        return null;
      },
    );
};

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
      res => res.data,
      err => {
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
      res => res.data,
      err => {
        console.error(err);
        return null;
      },
    );
};
