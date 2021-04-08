// @flow

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Layout } from 'antd';
import '../css/Resources.css';
import Loader from 'react-loader-spinner';
import { useIntl } from 'react-intl';

import { filterMessages } from '../utils/messages';

import { getCategories, getResourcesByCategory } from '../utils/api';
import { getSavedResources } from '../utils/auth';
import languages from '../data/languages';
import locations from '../data/locations';
import useWindowDimensions from '../utils/mobile';
import { useAuth } from '../utils/use-auth';
import ResourcesBanner from '../components/ResourcesBanner';
import ResourcesFilter from '../components/desktop/ResourcesFilter';
import ResourcesGrid from '../components/ResourcesGrid';
import ResourceCategoryFilter from '../components/ResourceCategoryFilter';
import ResourcesCatMobile from '../components/mobile/ResourcesCatMobile';

const { Sider } = Layout;

type Props = {
  location: { search: string },
  history: {
    pathname: string,
    push: ({
      pathname: string,
      search?: string,
    }) => void,
    search: string,
  },
  saved: boolean,
};

function Resources({
  saved = false,
  history = { pathname: '', search: '', push: () => {} },
  location: locationProp = { search: '' },
}: Props): React$Element<any> {
  const intl = useIntl();
  const freeTranslated = useMemo(
    () => intl.formatMessage(filterMessages.free),
    [intl],
  );
  const nameTranslated = useMemo(
    () => intl.formatMessage(filterMessages.name),
    [intl],
  );

  const [cost, setCost] = useState(`${freeTranslated} - $$$`);
  const [language, setLanguage] = useState('All');
  const [location, setLocation] = useState('All / Champaign County');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [sort, setSort] = useState(nameTranslated);
  const [loading, setLoading] = useState(false);
  const [resourceCount, setResourceCount] = useState(0);
  const [openKeys, setOpenKeys] = useState<Array<string>>([]);
  const [categories, setCategories] = useState<{ [string]: Array<string> }>({});
  const [filteredResources, setFilteredResources] = useState<Array<Resource>>(
    [],
  );
  const [savedSet, setSavedSet] = useState<Set<string>>(new Set());

  // Reset cost when language switch
  useEffect(() => {
    setCost(`${freeTranslated} - $$$`);
  }, [freeTranslated]);
  // Reset sort when language switch
  useEffect(() => setSort(nameTranslated), [nameTranslated]);

  const costs = useMemo(
    () => [
      freeTranslated,
      `${freeTranslated} - $`,
      `${freeTranslated} - $$`,
      `${freeTranslated} - $$$`,
    ],
    [freeTranslated],
  );
  const sorts = useMemo(
    () => [nameTranslated, intl.formatMessage(filterMessages.cost)],
    [intl, nameTranslated],
  );
  const isMobile = useWindowDimensions()[1];
  const { authed } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      const newCategories = {};
      if (res != null) {
        res.result.forEach((c) => {
          newCategories[c.name] = c.subcategories;
        });
      }

      setCategories(newCategories);
    };

    fetchCategories();
  }, []);

  const getCategorySelectedFromSearch = useCallback(() => {
    const { search } = locationProp;
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
  }, [locationProp]);

  const updateResources = useCallback(async () => {
    const [
      categorySelected,
      subcategorySelected,
    ] = getCategorySelectedFromSearch();

    setLoading(true);
    // TODO: size and page
    const newResources = await getResourcesByCategory(
      categorySelected,
      subcategorySelected,
      cost,
      language,
      location,
      sort,
    );

    let localSavedSet = new Set();
    if (authed === true) {
      const json = await getSavedResources();
      localSavedSet = new Set(json.result);
      setSavedSet(localSavedSet);
    }

    if (saved) {
      newResources.result.totalData = newResources.result.totalData.filter(
        (newResource) => localSavedSet.has(newResource._id),
      );
    }

    setCategory(categorySelected);
    setFilteredResources(
      newResources == null ? [] : newResources.result.totalData,
    );
    setOpenKeys([categorySelected]);
    setFilteredResources(
      newResources == null ? [] : newResources.result.totalData,
    );
    setResourceCount(
      newResources == null
        ? []
        : newResources.result.totalCount[0].resourceCount,
    );

    setSubcategory(subcategorySelected);

    setLoading(false);
  }, [
    getCategorySelectedFromSearch,
    cost,
    language,
    location,
    sort,
    authed,
    saved,
  ]);

  const updateSaved = updateResources;

  useEffect(() => {
    updateResources();
  }, [locationProp.search, saved, authed, updateResources]);

  const categorySelectAll = useCallback(() => {
    history.push({
      pathname: '/resources',
    });
  }, [history]);

  const subcategorySelect = useCallback(
    (value: string) => {
      history.push({
        pathname: '/resources',
        search: `?category=${category}&subcategory=${value}`,
      });
    },
    [category, history],
  );

  const onOpenChange = useCallback(
    (newOpenKeys: Array<string>) => {
      if (newOpenKeys.length === 0) {
        if (categories[category].indexOf(subcategory) !== -1) {
          history.push({
            pathname: '/resources',
            search: `?category=${category}`,
          });
          return;
        }
        setOpenKeys([]);
        return;
      }

      const latestOpenKey = newOpenKeys.find(
        (key) => openKeys.indexOf(key) === -1,
      );
      if (Object.keys(categories).indexOf(latestOpenKey) === -1) {
        setOpenKeys(newOpenKeys);
      } else {
        setOpenKeys(latestOpenKey != null ? [latestOpenKey] : []);
      }
      const categorySelected = latestOpenKey;
      history.push({
        pathname: '/resources',
        search: `?category=${categorySelected ?? ''}`,
      });
    },
    [categories, category, openKeys, subcategory, history],
  );

  return (
    <Layout className="resources">
      <ResourcesBanner
        categorySelected={category}
        subcategorySelected={subcategory}
      />
      {isMobile ? (
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
      ) : (
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
            updateSaved={updateSaved}
            resourceCount={resourceCount}
          />
        )}
      </Layout>
    </Layout>
  );
}

export default Resources;
