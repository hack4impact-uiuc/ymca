// @flow

import React from 'react';
import { List } from 'antd';

import '../css/MapViewList.css';
import MapViewEntry from './MapViewEntry';

type Props = {
  resources: Array<Resource>,
};

const MapViewList = (props: Props) => {
  const { resources, selectedResource, setSelectedResource } = props;

  return (
    <List
      className="list"
      dataSource={resources}
      pagination={{ simple: true }}
      renderItem={(resource) => (
        <List.Item
          onClick={() => {
            setSelectedResource(resource);
          }}
        >
          <MapViewEntry
            resource={resource}
            selected={resource.id === selectedResource?.id}
          />
        </List.Item>
      )}
    />
  );
};

export default MapViewList;
