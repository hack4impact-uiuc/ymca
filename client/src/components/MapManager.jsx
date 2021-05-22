// @flow

import React, { useState, useEffect, useMemo } from 'react';

import type { Resource } from '../types/models';
import { CHAMPAIGN_COORDS } from '../utils/geocoding';
import MapViewList from './MapViewList';
import ResourceMap from './ResourceMap';

type Props = {
  locationResult: { center: [number, number] },
  resources: Array<Resource>,
};

const MapManager = (props: Props) => {
  const { locationResult, resources, savedResources, updateSaved } = props;

  const [selectedResource, setSelectedResource] = useState<Resource>(null);
  const [currentLocation, setCurrentLocation] =
    useState<[number, number]>(CHAMPAIGN_COORDS);

  useEffect(() => {
    if (locationResult?.center) {
      setCurrentLocation(locationResult.center);
    }
  }, [locationResult]);

  const formattedResources = useMemo(
    () =>
      resources.map((r) => ({
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
        coordinates: r.geoLocation?.coordinates,
      })),
    [resources],
  );
  const origin = locationResult?.center ?? CHAMPAIGN_COORDS;
  const directionsURL =
    selectedResource &&
    'https://www.google.com/maps/dir/?api=1&' +
      `${encodeURI(
        `origin=${origin[1]},` +
          `${origin[0]}&destination=` +
          `${selectedResource.coordinates[1]},` +
          `${selectedResource.coordinates[0]}`,
      )}`;

  return (
    <>
      <MapViewList
        resources={formattedResources}
        selectedResource={selectedResource}
        setSelectedResource={(resource) => {
          setSelectedResource(resource);
          setCurrentLocation(resource.coordinates);
        }}
      />
      <ResourceMap
        directionsURL={directionsURL}
        resources={formattedResources}
        savedResources={savedResources}
        updateSaved={updateSaved}
        selectedResource={selectedResource}
        setSelectedResource={setSelectedResource}
        currentLocation={currentLocation}
        className="map"
      />
    </>
  );
};

export default MapManager;
