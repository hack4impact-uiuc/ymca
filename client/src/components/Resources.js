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
      categorySelected: '',
      subcategorySelected: '',
      openKeys: [],
      categories: {},
      languages: ['All', 'English', 'Spanish', 'Chinese', 'Japanese'],
      locations: ['All', 'Champaign', 'Urbana', 'Maibana', 'Foopaign'],
      costs: ['All', '$', '$$', '$$$', '$$$$'],
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
    const filteredResources = resources.filter(
      resource =>
        (resource.cost === cost || cost === 'All') &&
        (resource.subcategory === subcategory || subcategory === '') &&
        (resource.availableLanguages.includes(language) ||
          language === 'All') &&
        (resource.city === location || location === 'All'),
    );
    this.setState({ filteredResources });
  };

  categorySelectAll = async () => {
    this.props.history.push({
      pathname: '/resources',
      search: `?category=All Resources`,
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
    this.filterResources('All', 'All', 'All', subcategorySelected);
  }

  render() {
    const {
      categories,
      categorySelected,
      costs,
      filteredResources,
      languages,
      locations,
      subcategorySelected,
      openKeys,
    } = this.state;

    return (
      <Layout>
        <ResourcesBanner
          categorySelected={categorySelected}
          subcategorySelected={subcategorySelected}
        />
        <ResourcesFilter
          costs={costs}
          languages={languages}
          locations={locations}
          handleChangeFilter={this.handleFilterChange}
        />
        <Layout style={{ background: 'white' }}>
          <Sider style={{ background: 'white', marginTop: '-.5vh' }}>
            <Menu
              mode="inline"
              selectedKeys={
                categorySelected === 'All Resources' ? ['All Resources'] : []
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
          <ResourcesGrid filteredResources={filteredResources} />
        </Layout>
      </Layout>
    );
  }
}
