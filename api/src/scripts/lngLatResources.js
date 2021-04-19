const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const fetch = require('isomorphic-unfetch');
const Resource = require('../models/resource');

async function main() {
  dotenv.config({
    path: path.resolve(__dirname, `../../config/dev.env`),
  });

  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.Promise = global.Promise;

  mongoose.connection
    .once('open', () => console.log('Connected to MongoDB instance.'))
    .on('error', (error) => console.log('Error connecting to MongoDB:', error));

  let resources = await Resource.find({});
  for (let resource of resources) {
    if (
      (resource.address && resource.address.length > 0) ||
      (resource.city && resource.city.length > 0) ||
      (resource.state && resource.state.length > 0) ||
      (resource.zip && resource.zip.length > 0)
    ) {
      const apiLatLong =
        `https://www.mapquestapi.com/geocoding/v1/address?key=` +
        `${process.env.MAPBOX_KEY}&maxResults=5&location=${resource.address},${resource.city},${resource.state},${resource.zip}`;
      const response = await fetch(apiLatLong, {});

      const responseJson = await response.json();
      if (responseJson.info.statuscode === 0) {
        const { latLng } = responseJson.results[0].locations[0];
        resource = {
          ...resource._doc,
          geoLocation: { type: 'Point', coordinates: [latLng.lng, latLng.lat] },
        };
        const updatedResource = await Resource.findByIdAndUpdate(
          resource._id,
          resource,
          {
            new: true,
            runValidators: true,
          },
        );
      }
    }
  }
}
main();
