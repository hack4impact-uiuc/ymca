export const CHAMPAIGN_COORDS = [-88.2434, 40.1164];

export const searchLocation = (input) =>
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}` +
      `.json?bbox=-91,37.2,-87.6,42.4&access_token=pk.` +
      `eyJ1IjoiYW5vb2psYWwiLCJhIjoiY2syemtiYjZoMGp1eDNscXQ3azJzajl0bCJ9` +
      `.FDSFjP1IfSisbm4uvd70vg`,
    {
      method: 'GET',
    },
  ).then((res) => res.json());
