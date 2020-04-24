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
import { getSavedResources } from '../utils/auth';
import languages from '../data/languages';
import locations from '../data/locations';
import useWindowDimensions from '../utils/mobile';
import ResourcesBanner from '../components/desktop/ResourcesBanner';
import ResourcesFilter from '../components/desktop/ResourcesFilter';
import ResourcesGrid from '../components/ResourcesGrid';
import ResourceCategoryFilter from '../components/ResourceCategoryFilter';
import ResourcesCatMobile from '../components/mobile/ResourcesCatMobile';
import ResourcesBannerMobile from '../components/mobile/ResourcesBannerMobile';

const { Sider } = Layout;

function Resources(props) {
  const [cost, setCost] = useState('Free - $$$');
  const [language, setLanguage] = useState('All');
  const [location, setLocation] = useState('All');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [sort, setSort] = useState('Name');
  const [loading, setLoading] = useState(false);

  const [openKeys, setOpenKeys] = useState([]);
  const [categories, setCategories] = useState({});
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [savedSet, setSavedSet] = useState(new Set());

  const costs = ['Free', 'Free - $', 'Free - $$', 'Free - $$$'];
  const sorts = ['Name', 'Cost'];
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

  function compareNames(current, next) {
    const textCurrent = current.name.toUpperCase();
    const textNext = next.name.toUpperCase();
    const bool = textCurrent > textNext ? 1 : 0;
    return textCurrent < textNext ? -1 : bool;
  }

  function compareCosts(current, next) {
    const costOrder = ['$$$', '$$', '$', 'Free'];
    const costCurrent = current.cost;
    const costNext = next.cost;
    if (costCurrent === costNext) {
      return 0;
    }
    return costOrder.indexOf(costNext) < costOrder.indexOf(costCurrent)
      ? -1
      : 1;
  }

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

    let localSavedSet = new Set();
    if (props.authed) {
      const json = await getSavedResources();
      localSavedSet = new Set(json.result);
      setSavedSet(localSavedSet);
    }

    if (props.saved) {
      newResources.result = newResources.result.filter(newResource =>
        localSavedSet.has(newResource._id),
      );
    }

    newResources.result.sort(compareNames);

    setCategory(categorySelected);
    setFilteredResources(newResources == null ? [] : newResources.result);
    setOpenKeys([categorySelected]);
    setResources(newResources == null ? [] : newResources.result);
    setSubcategory(subcategorySelected);
    setCost('Free - $$$');
    setLanguage('All');
    setLocation('All / Champaign County');
    setSubcategory(subcategorySelected);

    setLoading(false);
  }, [getCategorySelectedFromSearch, props.saved, props.authed]);

  const updateSaved = async () => {
    updateResources();
  };

  const updateSort = useCallback(() => {
    switch (sort) {
      case 'Name': {
        const newResources = resources.sort(compareNames);
        const newFilteredResources = filteredResources.sort(compareNames);
        setFilteredResources(newFilteredResources);
        setResources(newResources);
        break;
      }
      case 'Cost': {
        const newResources = resources.sort(compareCosts);
        const newFilteredResources = filteredResources.sort(compareCosts);
        setFilteredResources(newFilteredResources);
        setResources(newResources);
        break;
      }
      default:
    }
  });

  useEffect(() => {
    updateResources();
  }, [props.location.search, props.saved, props.authed, updateResources]);

  useEffect(() => {
    const costMap = {
      Free: ['Free'],
      'Free - $': ['Free', '$'],
      'Free - $$': ['Free', '$', '$$'],
      'Free - $$$': ['Free', '$', '$$', '$$$'],
    };
    updateSort();
    const newFilteredResources = resources.filter(
      resource =>
        (resource.subcategory.includes(subcategory) || subcategory === '') &&
        (costMap[cost].includes(resource.cost) || cost === 'Free - $$$') &&
        (resource.availableLanguages.includes(language) ||
          language === 'All') &&
        (resource.city === location || location === 'All / Champaign County'),
    );

    setFilteredResources(newFilteredResources);
  }, [cost, language, location, subcategory, resources, sort]);

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
      {!isMobile && (
        <ResourcesBanner
          categorySelected={category}
          subcategorySelected={subcategory}
        />
      )}
      {isMobile && (
        <ResourcesBannerMobile
          categorySelected={category}
          subcategorySelected={subcategory}
        />
      )}
      {!isMobile && (
        <ResourcesFilter
          costs={costs}
          costSelected={cost}
          languages={languages}
          languageSelected={language}
          locations={locations}
          locationSelected={location}
          sorts={sorts}
          sortSelected={sort}
          setCost={setCost}
          setLanguage={setLanguage}
          setLocation={setLocation}
          setSort={setSort}
        />
      )}
      {isMobile && (
        <div className="filter-bar">
          <hr className="line" />
          <ResourcesCatMobile
            category={category}
            categories={categories}
            categorySelectAll={categorySelectAll}
            onOpenChange={onOpenChange}
            openKeys={openKeys}
            subcategory={subcategory}
            subcategorySelect={subcategorySelect}
            costs={costs}
            costSelected={cost}
            languages={languages}
            languageSelected={language}
            locations={locations}
            locationSelected={location}
            sorts={sorts}
            sortSelected={sort}
            setCost={setCost}
            setLanguage={setLanguage}
            setLocation={setLocation}
            setSort={setSort}
          />
          <hr className="line" />
        </div>
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
          <ResourcesGrid
            filteredResources={filteredResources}
            savedResources={savedSet}
            authed={props.authed}
            updateSaved={updateSaved}
          />
        )}
      </Layout>
    </Layout>
  );
}

Resources.defaultProps = {
  location: { search: '' },
  history: { pathname: '', search: '' },
  saved: false,
  authed: false,
};

Resources.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string }),
  history: PropTypes.shape({
    pathname: PropTypes.string,
    push: PropTypes.func,
    search: PropTypes.string,
  }),
  saved: PropTypes.bool,
  authed: PropTypes.bool,
};

export default Resources;
