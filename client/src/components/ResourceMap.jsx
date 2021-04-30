// @flow

import React, { useState, useEffect, useMemo } from 'react';
import '../css/ResourceMap.css';

import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import MapViewModal from './MapViewModal';

type Props = {};

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiYW5vb2psYWwiLCJhIjoiY2syemtiYjZoMGp1' +
    'eDNscXQ3azJzajl0bCJ9.FDSFjP1IfSisbm4uvd70vg',
  interactive: true,
});

const ResourceMap = (props: Props) => {
  const { resources, selectedResource, currentLocation } = props;
  const [modalOpened, setModalOpened] = useState<Boolean>(false);

  useEffect(() => {
    setModalOpened(true);
  }, [selectedResource]);

  const mapComponent = useMemo(
    () => (
      <Map
        style="mapbox://styles/mapbox/light-v9"
        center={currentLocation}
        containerStyle={{
          height: '600px',
          width: '875px',
        }}
        zoom={[17]}
      >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          {resources.map((resource) => (
            <Feature key={resource.id} coordinates={resource.coordinates} />
          ))}
        </Layer>
      </Map>
    ),
    [resources, currentLocation],
  );

  return (
    <div className="map">
      {mapComponent}
      {modalOpened && selectedResource && (
        <MapViewModal
          resource={selectedResource}
          setModalOpened={setModalOpened}
          className="modal"
        />
      )}
    </div>
  );
};

export default ResourceMap;
