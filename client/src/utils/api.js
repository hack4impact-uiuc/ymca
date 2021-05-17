// @flow

/* eslint-disable no-console */

import axios from 'axios';

import type {
  Category,
  HomePage,
  Resource,
  Translation,
} from '../types/models';
import type { ApiResponse } from '../types/apiResponse';

const instance = axios.create({
  baseURL: 'https://nawc.vercel.app',
  // For testing on dev database:
  // baseURL: 'http://localhost:9000',
});

export const imageToLink = (
  image: ?(string | ArrayBuffer),
): ApiResponse<string> => {
  const requestExtension = '/api/admin/imageUpload';
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
  category: ?string,
  subcategory: ?string,
  cost: ?string,
  language: ?string,
  city: ?string,
  sort: ?string,
  size: ?number,
  page: ?number,
  coordinates: ?[number, number],
): ApiResponse<Array<Resource>> => {
  const requestExtension = `/api/resources`;
  const params = {
    category,
    subcategory,
    cost,
    language,
    city,
    sort,
    size,
    page,
    long: coordinates && coordinates[0],
    lat: coordinates && coordinates[1],
  };
  return instance.get(requestExtension, { params }).then(
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

export const renameCategory = (
  id: string,
  newName: string,
  currentName: string,
): ApiResponse<Category> => {
  const requestExtension = `/api/admin/categories/${id}`;
  return instance
    .put(
      requestExtension,
      { newName, currentName },
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

export const deleteCategory = (
  id: string,
  categoryName: string,
): ApiResponse<null> => {
  const requestExtension = `/api/admin/categories/${id}`;
  return instance({
    url: requestExtension,
    method: 'delete',
    data: { categoryName },
    headers: {
      token: localStorage.getItem('token'),
    },
  }).then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    },
  );
};

export const addSubcategory = (
  id: string,
  name: string,
): ApiResponse<Category> =>
  instance
    .post(
      `/api/admin/subcategories/${id}`,
      { name },
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

export const renameSubcategory = (
  id: string,
  category: string,
  currentName: string,
  subcategoryId: string,
  newName: string,
): ApiResponse<Category> => {
  const requestExtension = `/api/admin/subcategories/${id}`;
  return instance
    .put(
      requestExtension,
      { category, newName, currentName, subcategoryId },
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

export const deleteSubcategory = (
  id: string,
  category: string,
  subcategory: string,
  subcategoryId: string,
): ApiResponse<Category> => {
  const requestExtension = `/api/admin/subcategories/${id}`;
  return instance({
    url: requestExtension,
    method: 'delete',
    data: { category, subcategory, subcategoryId },
    headers: {
      token: localStorage.getItem('token'),
    },
  }).then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    },
  );
};

export const getTranslationByLanguage = (
  language: string,
): ApiResponse<Translation> => {
  const requestExtension = `/api/translation?language=${language}`;
  return instance.get(requestExtension).then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    },
  );
};

export const getResourceIsVerified = (
  id: string,
  language: string,
): ApiResponse<boolean> => {
  const requestExtension = `/api/translation/${id}?language=${language}`;
  return instance.get(requestExtension).then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    },
  );
};

export const verifyTranslations = (
  language: string,
  type: string,
  translations: Array<any>,
): ApiResponse<void> => {
  const requestExtension = `/api/admin/verified`;
  return instance({
    url: requestExtension,
    method: 'put',
    params: { language, type },
    data: { translations },
    headers: {
      token: localStorage.getItem('token'),
    },
  }).then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    },
  );
};

export const editResourceCategories = (
  id: string,
  category: Array<string>,
  subcategory: Array<string>,
): ApiResponse<Resource> => {
  const requestExtension = `/api/admin/resources/${id}`;
  return instance
    .patch(
      requestExtension,
      { category, subcategory },
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

export const reportTranslationError = (
  id: string,
  language: string,
  type: string,
): ApiResponse<null> => {
  const requestExtension = `/api/translation/report/${id}`;
  return instance.patch(requestExtension, { language, type }).then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    },
  );
};

export const getTextToBeTranslated = (
  id: string,
  language: string,
  type: string,
): ApiResponse<Text> => {
  const requestExtension =
    // eslint-disable-next-line no-useless-concat
    `/api/admin/verified/${id}` + `?language=${language}&type=${type}`;
  return instance
    .get(requestExtension, {
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

export const getVerifications = (language: string): ApiResponse<Void> => {
  const requestExtension = '/api/admin/verified';
  return instance({
    url: requestExtension,
    method: 'get',
    params: { language },
    headers: {
      token: localStorage.getItem('token'),
    },
  }).then(
    (res) => res.data,
    (err) => {
      console.error(err);
      return null;
    },
  );
};
