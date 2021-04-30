// @flow

import React, { useState, useEffect } from 'react';
import { getResourcesByCategory } from '../utils/api';

import MapViewList from './MapViewList';
import ResourceMap from './ResourceMap';

const CHAMPAIGN_COORDS = [-88.2434, 40.1164];

type Props = { locationResult: { center: [number, number] } };

const MapManager = (props: Props) => {
  const { locationResult } = props;

  const [resources, setResources] = useState<Array<Resource>>([]);
  const [selectedResource, setSelectedResource] = useState<Resource>(null);
  const [currentLocation, setCurrentLocation] = useState<[number, number]>(
    CHAMPAIGN_COORDS,
  );

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
        locationResult.center ?? CHAMPAIGN_COORDS,
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
  }, [locationResult.center]);

  useEffect(() => {
    if (locationResult?.center) {
      setCurrentLocation(locationResult.center);
    }
  }, [locationResult]);

  return (
    <>
      <MapViewList
        resources={resources}
        selectedResource={selectedResource}
        setSelectedResource={(resource) => {
          setSelectedResource(resource);
          setCurrentLocation(resource.coordinates);
        }}
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
