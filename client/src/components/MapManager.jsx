// @flow

import React, { useState, useEffect } from 'react';
import { getResourcesByCategory } from '../utils/api';

import MapViewList from './MapViewList';
import ResourceMap from './ResourceMap';

type Props = {};

const MapManager = (props: Props) => {
  const { locationResult } = props;

  const [resources, setResources] = useState<Array<Resource>>([]);
  const [selectedResource, setSelectedResource] = useState<Resource>(null);
  const [currentLocation, setCurrentLocation] = useState([0, 0]);

  const location = '505 E Healey St, Champaign, IL 61820';

  useEffect(() => {
    const fetchResources = async () => {
      const res = await getResourcesByCategory(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        location,
      );
      const newResources = [];
      if (res != null) {
        res.result.totalData.forEach((r) => {
          newResources.push({
            name: r.name,
            city: r.city,
            address: r.address,
            cost: r.cost,
            id: r._id.toString(),
            image: r.image,
            languages: r.availableLanguages,
            distance: r.calculatedDistance,
            description: r.description,
            website: r.website,
            phoneNumber: r.phoneNumbers[0]?.phoneNumber,
            email: r.email,
            category: r.category[0],
            coordinates: r.geoLocation.coordinates,
          });
        });
      }
      setResources(newResources);
      setCurrentLocation(newResources[0].coordinates);
    };

    fetchResources();
  }, []);

  useEffect(() => {
    setCurrentLocation(locationResult.center);
  }, [locationResult]);

  useEffect(() => {
    setCurrentLocation(selectedResource.coordinates);
  }, [selectedResource]);

  return (
    <>
      <MapViewList
        resources={resources}
        selectedResource={selectedResource}
        setSelectedResource={setSelectedResource}
      />
      <ResourceMap
        resources={resources}
        selectedResource={selectedResource}
        currentLocation={currentLocation}
        className="map"
      />
    </>
  );
};

export default MapManager;
