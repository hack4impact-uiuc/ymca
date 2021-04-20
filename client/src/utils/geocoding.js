const searchLocation = (input) =>
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}` +
      `.json?bbox=-88.5,39.9,-88,40.4&access_token=pk.` +
      `eyJ1IjoiYW5vb2psYWwiLCJhIjoiY2syemtiYjZoMGp1eDNscXQ3azJzajl0bCJ9` +
      `.FDSFjP1IfSisbm4uvd70vg`,
    {
      method: 'GET',
    },
  ).then((res) => res.json());

export default searchLocation;
