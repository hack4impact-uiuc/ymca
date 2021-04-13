// @flow

import React, { useState, useEffect } from 'react';
import { List } from 'antd';

import '../css/MapViewList.css';
import { getResourcesByCategory } from '../utils/api';
import MapViewEntry from './MapViewEntry';

type Props = {};

const MapViewList = (props: Props) => {
  const { selected } = props;

  const [resources, setResources] = useState<Array<Resource>>([]);
  const location = '1299 N Arbor Ln, Palatine, IL 60067';

  useEffect(() => {
    const fetchResources = async () => {
      const res = await getResourcesByCategory(
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
          const pairs = r.subcategory.map(
            (subcat, idx) => `${r.category[idx]}~${subcat}`,
          );
          newResources.push({
            name: r.name,
            description: r.description,
            categories: r.category,
            subcategories: r.subcategory,
            categoryPairs: pairs,
            id: r._id.toString(),
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
      bordered
      dataSource={resources}
      renderItem={(resource) => (
        <List.Item>
          <MapViewEntry data={resource} selected />
        </List.Item>
      )}
    />
  );
};

export default MapViewList;
