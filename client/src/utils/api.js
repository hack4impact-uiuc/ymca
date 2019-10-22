const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:9000',
});

export const getCategories = () => {
  return instance.get('/api/categories').then(res => res.data, err => null);
};

export const getResources = () => {
  return instance.get('/api/resources').then(res => res.data, err => null);
};

export const getResourcesByCategory = category => {
  const requestExtension = `/api/resources?category=${category}`;
  return instance.get(requestExtension).then(res => res.data, err => null);
};

export const getResourceByID = id => {
  const requestExtension = `/api/resources/${id}`;
  return instance.get(requestExtension).then(res => res.data, err => null);
};

export const addResource = resource => {
  return instance
    .post('/api/resources', resource)
    .then(res => res.data, err => null);
};

export const editResource = (id, resource) => {
  const requestExtension = `/api/resources/${id}`;
  return instance
    .put(requestExtension, resource)
    .then(res => res.data, err => null);
};

export const deleteResource = id => {
  const requestExtension = `/api/resources/${id}`;
  return instance.delete(requestExtension).then(res => res.data, err => null);
};
