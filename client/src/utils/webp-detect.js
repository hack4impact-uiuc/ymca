// @flow

const webpSupport = (): boolean => {
  const c = document.createElement('canvas');
  if (c.getContext && c.getContext('2d'))
    return c.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  return false;
};

export default webpSupport;
