// Address,city,state,zip
const extractLongLat = async (location) => {
  if (location !== null && location !== undefined) {
    const apiLatLong =
      `https://www.mapquestapi.com/geocoding/v1/address?key=` +
      `${process.env.MAPBOX_KEY}&maxResults=5&location=${location}`;
    const response = await fetch(apiLatLong, {});

    const responseJson = await response.json();
    if (responseJson.info.statuscode === 0) {
      const { latLng } = responseJson.results[0].locations[0];
      return [latLng.lng, latLng.lat];
    }
  }
  return [null, null];
};

module.exports = extractLongLat;
