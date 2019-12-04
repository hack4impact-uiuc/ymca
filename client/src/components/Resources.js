import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import '../css/Resources.css';

import {
  getCategories,
  getResources,
  getResourcesByCategory,
} from '../utils/api';

import ResourcesBanner from './ResourcesBanner';
import ResourcesFilter from './ResourcesFilter';
import ResourcesGrid from './ResourcesGrid';

const { Sider } = Layout;
const { SubMenu } = Menu;

function Resources(props) {
  const [cost, setCost] = useState('$ - $$$$');
  const [language, setLanguage] = useState('All');
  const [location, setLocation] = useState('All');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');

  const [openKeys, setOpenKeys] = useState([]);
  const [categories, setCategories] = useState({});
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);

  const languages = ['All', 'English', 'Spanish', 'Chinese', 'Japanese'];
  const locations = ['All', 'Champaign', 'Urbana', 'Savoy'];
  const costs = ['$', '$ - $$', '$ - $$$', '$ - $$$$'];

  const fetchCategories = async () => {
    const res = await getCategories();
    const newCategories = {};
    if (res != null) {
      res.result.forEach(c => {
        newCategories[c.name] = c.subcategories;
      });
    }

    setCategories(newCategories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const getCategorySelectedFromSearch = useCallback(() => {
    const { search } = props.location;
    if (search === '') {
      return ['All Resources', ''];
    }

    const subcategoryIndex = search.indexOf('&');
    let categorySelected = search.slice(
      search.indexOf('=') + 1,
      subcategoryIndex === -1 ? search.length : subcategoryIndex,
    );
    categorySelected = categorySelected.replace(/%[\d]*/g, ' ');

    let subcategorySelected =
      subcategoryIndex === -1
        ? ''
        : search.slice(search.indexOf('=', subcategoryIndex) + 1);
    subcategorySelected = subcategorySelected.replace(/%[\d]*/g, ' ');

    return [categorySelected, subcategorySelected];
  }, [props.location]);

  const updateResources = useCallback(async () => {
    const [
      categorySelected,
      subcategorySelected,
    ] = getCategorySelectedFromSearch();

    const newResources =
      categorySelected === 'All Resources'
        ? await getResources()
        : await getResourcesByCategory(categorySelected);

    setCategory(categorySelected);
    setFilteredResources(newResources == null ? [] : newResources.result);
    setOpenKeys([categorySelected]);
    setResources(newResources == null ? [] : newResources.result);
    setSubcategory(subcategorySelected);

    setCost('$ - $$$$');
    setLanguage('All');
    setLocation('All');
    setSubcategory(subcategorySelected);
  }, [getCategorySelectedFromSearch]);

  useEffect(() => {
    updateResources();
  }, [props.location.search, updateResources]);

  useEffect(() => {
    const costMap = {
      $: ['$'],
      '$ - $$': ['$', '$$'],
      '$ - $$$': ['$', '$$', '$$$'],
      '$ - $$$$': ['$', '$$', '$$$', '$$$$'],
    };

    const newFilteredResources = resources.filter(
      resource =>
        (resource.subcategory.includes(subcategory) || subcategory === '') &&
        (costMap[cost].includes(resource.cost) || cost === '$ - $$$$') &&
        (resource.availableLanguages.includes(language) ||
          language === 'All') &&
        (resource.city === location || location === 'All'),
    );

    setFilteredResources(newFilteredResources);
  }, [cost, language, location, subcategory, resources]);

  const categorySelectAll = useCallback(() => {
    props.history.push({
      pathname: '/resources',
    });
  }, [props.history]);

  const subcategorySelect = useCallback(
    value => {
      props.history.push({
        pathname: '/resources',
        search: `?category=${category}&subcategory=${value}`,
      });
    },
    [category, props.history],
  );

  const onOpenChange = useCallback(
    async newOpenKeys => {
      if (newOpenKeys.length === 0) {
        if (categories[category].indexOf(subcategory) !== -1) {
          props.history.push({
            pathname: '/resources',
            search: `?category=${category}`,
          });
          return;
        }
        setOpenKeys([]);
        return;
      }

      const latestOpenKey = newOpenKeys.find(
        key => openKeys.indexOf(key) === -1,
      );
      if (Object.keys(categories).indexOf(latestOpenKey) === -1) {
        setOpenKeys(newOpenKeys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
      const categorySelected = latestOpenKey;
      props.history.push({
        pathname: '/resources',
        search: `?category=${categorySelected}`,
      });
    },
    [categories, category, openKeys, subcategory, props.history],
  );

  return (
    <Layout className="resources">
      <ResourcesBanner
        categorySelected={category}
        subcategorySelected={subcategory}
      />
      <ResourcesFilter
        costs={costs}
        costSelected={cost}
        languages={languages}
        languageSelected={language}
        locations={locations}
        locationSelected={location}
        setCost={setCost}
        setLanguage={setLanguage}
        setLocation={setLocation}
      />
      <Layout style={{ background: 'white' }}>
        <div>
          <Sider className="filter-sider">
            <Menu
              mode="inline"
              selectedKeys={subcategory === '' ? category : subcategory}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
            >
              <Menu.Item
                key="All Resources"
                onClick={() => categorySelectAll()}
              >
                All Resources
              </Menu.Item>
              {Object.keys(categories).map(categoryName => {
                return (
                  <SubMenu key={categoryName} title={categoryName}>
                    {categories[categoryName].map(subCategory => {
                      return (
                        <Menu.Item
                          key={subCategory}
                          onClick={() => subcategorySelect(subCategory)}
                        >
                          {subCategory}
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              })}
            </Menu>
          </Sider>
        </div>
        <ResourcesGrid filteredResources={filteredResources} />
      </Layout>
    </Layout>
  );
}

Resources.defaultProps = {
  location: { search: '' },
  history: { pathname: '', search: '' },
};

Resources.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string }),
  history: PropTypes.arrayOf(
    PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
  ),
};

export default Resources;
