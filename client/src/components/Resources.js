import React, { Component } from 'react';
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

export default class Resources extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      costSelected: '$ - $$$$',
      languageSelected: 'All',
      locationSelected: 'All',

      categorySelected: '',
      subcategorySelected: '',

      openKeys: [],
      categories: {},
      languages: ['All', 'English', 'Spanish', 'Chinese', 'Japanese'],
      locations: ['All', 'Champaign', 'Urbana', 'Maibana', 'Foopaign'],
      costs: ['$', '$ - $$', '$ - $$$', '$ - $$$$'],

      resources: [],
      filteredResources: [],
    };
  }

  async componentDidMount() {
    const res = await getCategories();
    const categories = {};
    if (res != null) {
      res.result.forEach(category => {
        categories[category.name] = category.subcategories;
      });
    }
    this.updateResources();
    this.setState({
      categories,
    });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.updateResources();
    }
  }

  getCategorySelectedFromSearch() {
    const { search } = this.props.location;
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
  }

  filterResources = (cost, language, location, subcategory) => {
    const { resources } = this.state;
    const costMap = {
      $: ['$'],
      '$ - $$': ['$', '$$'],
      '$ - $$$': ['$', '$$', '$$$'],
      '$ - $$$$': ['$', '$$', '$$$', '$$$$'],
    };

    const filteredResources = resources.filter(
      resource =>
        costMap[cost].includes(resource.cost) &&
        (resource.subcategory === subcategory || subcategory === '') &&
        (resource.availableLanguages.includes(language) ||
          language === 'All') &&
        (resource.city === location || location === 'All'),
    );
    this.setState({
      costSelected: cost,
      filteredResources,
      languageSelected: language,
      locationSelected: location,
      subcategorySelected: subcategory,
    });
  };

  categorySelectAll = async () => {
    this.props.history.push({
      pathname: '/resources',
    });
  };

  subcategorySelect = value => {
    this.props.history.push({
      pathname: '/resources',
      search: `?category=${this.state.categorySelected}&subcategory=${value}`,
    });
  };

  handleFilterChange = (cost, language, location) => {
    this.filterResources(
      cost,
      language,
      location,
      this.state.subcategorySelected,
    );
  };

  onOpenChange = async openKeys => {
    if (openKeys.length === 0) {
      this.setState({ openKeys: [] });
      return;
    }

    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1,
    );
    if (Object.keys(this.state.categories).indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
    const categorySelected = latestOpenKey;
    this.props.history.push({
      pathname: '/resources',
      search: `?category=${categorySelected}`,
    });
  };

  async updateResources() {
    const [
      categorySelected,
      subcategorySelected,
    ] = this.getCategorySelectedFromSearch();
    const resources =
      categorySelected === 'All Resources'
        ? await getResources()
        : await getResourcesByCategory(categorySelected);
    this.setState({
      categorySelected,
      filteredResources: resources == null ? [] : resources.result,
      openKeys: [categorySelected],
      resources: resources == null ? [] : resources.result,
      subcategorySelected,
    });
    this.filterResources('$ - $$$$', 'All', 'All', subcategorySelected);
  }

  render() {
    const {
      categories,
      categorySelected,
      costs,
      costSelected,
      filteredResources,
      languages,
      languageSelected,
      locations,
      locationSelected,
      subcategorySelected,
      openKeys,
    } = this.state;

    return (
      <Layout className="resources">
        <ResourcesBanner
          categorySelected={categorySelected}
          subcategorySelected={subcategorySelected}
        />
        <ResourcesFilter
          costs={costs}
          costSelected={costSelected}
          languages={languages}
          languageSelected={languageSelected}
          locations={locations}
          locationSelected={locationSelected}
          handleChangeFilter={this.handleFilterChange}
        />
        <Layout style={{ background: 'white' }}>
          <div>
            <Sider className="filter-sider">
              <Menu
                mode="inline"
                selectedKeys={
                  subcategorySelected === ''
                    ? categorySelected
                    : subcategorySelected
                }
                openKeys={openKeys}
                onOpenChange={this.onOpenChange}
              >
                <Menu.Item
                  key="All Resources"
                  onClick={() => this.categorySelectAll()}
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
                            onClick={() => this.subcategorySelect(subCategory)}
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
}
