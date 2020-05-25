/* eslint-disable no-console */

const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://nawc.now.sh',
});

export const imageToLink = image => {
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

export const getHomePage = () => {
  return instance.get('/api/homepage').then(
    res => res.data,
    err => {
      console.error(err);
      return null;
    },
  );
};

export const editHomePage = homepage => {
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

export const createHomePage = homepage => {
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

export const getCategories = () => {
  return instance.get('/api/categories').then(
    res => res.data,
    err => {
      console.error(err);
      return null;
    },
  );
};

export const getResources = () => {
  return instance.get('/api/resources').then(
    res => res.data,
    err => {
      console.error(err);
      return null;
    },
  );
};

export const getResourcesByCategory = category => {
  const requestExtension = `/api/resources?category=${category}`;
  return instance.get(requestExtension).then(
    res => res.data,
    err => {
      console.error(err);
      return null;
    },
  );
};

export const getResourceByID = (id, needLatLong) => {
  const requestExtension = `/api/resources/${id}?requireLatLong=${needLatLong}`;
  return instance.get(requestExtension).then(
    res => res.data,
    err => {
      console.error(err);
      return null;
    },
  );
};

export const addResource = resource => {
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

export const editResource = (id, resource) => {
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

export const deleteResource = id => {
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
