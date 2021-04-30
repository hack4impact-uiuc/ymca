// @flow

import React, { useState, useEffect, useMemo } from 'react';
import '../css/ResourceMap.css';

import ReactMapboxGl from 'react-mapbox-gl';
import MapViewModal from './MapViewModal';

type Props = {};

const ResourceMap = (props: Props) => {
  const { selectedResource } = props;
  const [modalOpened, setModalOpened] = useState<Boolean>(false);

  useEffect(() => {
    setModalOpened(true);
  }, [selectedResource]);

  const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiYW5vb2psYWwiLCJhIjoiY2syemtiYjZoMGp1' +
      'eDNscXQ3azJzajl0bCJ9.FDSFjP1IfSisbm4uvd70vg',
    interactive: true,
  });

  const mapComponent = useMemo(
    () => (
      <Map
        style="mapbox://styles/mapbox/light-v9"
        containerStyle={{
          height: '600px',
          width: '875px',
        }}
        zoom={[15]}
      />
    ),
    [],
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
