// @flow

export const getIsWebpSupported = (): boolean => {
  const c = document.createElement('canvas');
  if (c.getContext && c.getContext('2d'))
    return c.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  return false;
};

export const canBeWebpConverted = (path: string): boolean => {
  return !path.includes('imgur');
};
