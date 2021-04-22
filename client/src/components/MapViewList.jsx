// @flow

import React, { useState, useEffect } from 'react';
import { List } from 'antd';

import '../css/MapViewList.css';
import { getResourcesByCategory } from '../utils/api';
import MapViewEntry from './MapViewEntry';

const MapViewList = () => {
  const [resources, setResources] = useState<Array<Resource>>([]);
  const [selectedID, setSelectedID] = useState('');
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
            languages: r.availableLanguages,
            distance: r.calculatedDistance,
          });
        });
      }
      setResources(newResources);
    };

    fetchResources();
  }, []);

  return (
    <List
      className="list"
      dataSource={resources}
      renderItem={(resource) => (
        <List.Item onClick={() => setSelectedID(resource.id)}>
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
