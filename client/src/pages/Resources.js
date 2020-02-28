import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import '../css/Resources.css';
import Loader from 'react-loader-spinner';

import {
  getCategories,
  getResources,
  getResourcesByCategory,
} from '../utils/api';
import languages from '../data/languages';
import locations from '../data/locations';
import useWindowDimensions from '../utils/mobile';
import ResourcesBanner from '../components/ResourcesBanner';
import ResourcesFilter from '../components/ResourcesFilter';
import ResourcesFilterMobile from '../components/mobile/ResourcesFilterMobile';
import ResourcesGrid from '../components/ResourcesGrid';
import ResourceCategoryFilter from '../components/ResourceCategoryFilter';
import ResourcesCategoryFilterMobile from '../components/mobile/ResourcesCategoryFilterMobile';

const { Sider } = Layout;

function Resources(props) {
  const [cost, setCost] = useState('Free - $$$');
  const [language, setLanguage] = useState('All');
  const [location, setLocation] = useState('All');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [loading, setLoading] = useState(false);

  const [openKeys, setOpenKeys] = useState([]);
  const [categories, setCategories] = useState({});
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);

  const costs = ['Free', 'Free - $', 'Free - $$', 'Free - $$$'];

  const isMobile = useWindowDimensions()[1];

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

    setLoading(true);

    const newResources =
      categorySelected === 'All Resources'
        ? await getResources()
        : await getResourcesByCategory(categorySelected);

    setLoading(false);

    setCategory(categorySelected);
    setFilteredResources(newResources == null ? [] : newResources.result);
    setOpenKeys([categorySelected]);
    setResources(newResources == null ? [] : newResources.result);
    setSubcategory(subcategorySelected);

    setCost('Free - $$$');
    setLanguage('All');
    setLocation('All');
    setSubcategory(subcategorySelected);
  }, [getCategorySelectedFromSearch]);

  useEffect(() => {
    updateResources();
  }, [props.location.search, updateResources]);

  useEffect(() => {
    const costMap = {
      Free: ['Free'],
      'Free - $': ['Free', '$'],
      'Free - $$': ['Free', '$', '$$'],
      'Free - $$$': ['Free', '$', '$$', '$$$'],
    };

    const newFilteredResources = resources.filter(
      resource =>
        (resource.subcategory.includes(subcategory) || subcategory === '') &&
        (costMap[cost].includes(resource.cost) || cost === 'Free - $$$') &&
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
      {isMobile && (
        <ResourcesFilterMobile
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
      )}
      <ResourcesBanner
        categorySelected={category}
        subcategorySelected={subcategory}
      />
      {!isMobile && (
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
      )}
      {isMobile && (
        <ResourcesCategoryFilterMobile
          category={category}
          categories={categories}
          categorySelectAll={categorySelectAll}
          onOpenChange={onOpenChange}
          openKeys={openKeys}
          subcategory={subcategory}
          subcategorySelect={subcategorySelect}
        />
      )}
      <Layout style={{ background: 'white' }}>
        {!isMobile && (
          <div>
            <Sider className="filter-sider">
              <ResourceCategoryFilter
                category={category}
                categories={categories}
                categorySelectAll={categorySelectAll}
                onOpenChange={onOpenChange}
                openKeys={openKeys}
                subcategory={subcategory}
                subcategorySelect={subcategorySelect}
              />
            </Sider>
          </div>
        )}
        {loading ? (
          <Loader
            className="loader"
            type="Circles"
            color="#6A3E9E"
            height={100}
            width={100}
          />
        ) : (
          <ResourcesGrid filteredResources={filteredResources} />
        )}
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
  history: PropTypes.shape({
    pathname: PropTypes.string,
    push: PropTypes.func,
    search: PropTypes.string,
  }),
};

export default Resources;
