// @flow

import React, { useState } from 'react';
import { List } from 'antd';

import '../css/MapViewList.css';
import MapViewEntry from './MapViewEntry';

type Props = {
  resources: Array<Resource>,
};

const MapViewList = (props: Props) => {
  const { resources, setSelectedResource } = props;
  const [selectedID, setSelectedID] = useState('');

  return (
    <List
      className="list"
      dataSource={resources}
      renderItem={(resource) => (
        <List.Item
          onClick={() => {
            setSelectedID(resource.id);
            setSelectedResource(resource);
          }}
        >
          <MapViewEntry
            resource={resource}
            selected={resource.id === selectedID}
          />
        </List.Item>
      )}
    />
  );
};

export default MapViewList;
