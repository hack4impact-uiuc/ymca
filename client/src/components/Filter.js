import React, { Component } from 'react';
import { Col, Layout, Menu, Row } from 'antd';
import '../css/Filter.css';

import {
  getCategories,
  getResources,
  getResourcesByCategory,
} from '../utils/api';

import FilterPreview from './FilterPreview';
import ResourceViewFilterHeader from './ResourceViewFilterHeader';
import ResourceViewHeader from './ResourceViewHeader';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

export default class Filter extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      languageDropdownOpen: false,
      locationDropdownOpen: false,
      costDropdownOpen: false,

      languageSelected: '',
      locationSelected: '',

      categorySelected: '',
      subcategorySelected: '',
      costSelected: '',

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

  languageToggle = () => {
    this.setState(prevState => ({
      languageDropdownOpen: !prevState.languageDropdownOpen,
    }));
  };

  locationToggle = () => {
    this.setState(prevState => ({
      locationDropdownOpen: !prevState.locationDropdownOpen,
    }));
  };

  handleFilterChange = (cost, language, location) => {
    this.setState({
      costSelected: cost,
      languageSelected: language,
      locationSelected: location,
    });
    this.filterResources(
      cost,
      language,
      location,
      this.state.subcategorySelected,
    );
  };

  costToggle = () => {
    this.setState(prevState => ({
      costDropdownOpen: !prevState.costDropdownOpen,
    }));
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

  getGrid = () => {
    const { filteredResources } = this.state;
    return Array(Math.ceil(filteredResources.length / 3))
      .fill()
      .map((_, index) => {
        const first = filteredResources[index * 3];
        const second =
          index * 3 + 1 < filteredResources.length
            ? filteredResources[index * 3 + 1]
            : null;
        const third =
          index * 3 + 2 < filteredResources.length
            ? filteredResources[index * 3 + 2]
            : null;
        return (
          <Row gutter={[32, 32]}>
            <Col span={8}>
              <FilterPreview
                availableLanguages={first.availableLanguages}
                cost={first.cost}
                id={first._id}
                key={first._id}
                location={first.location}
                name={first.name}
              />
            </Col>
            {second && (
              <Col span={8}>
                <FilterPreview
                  availableLanguages={second.availableLanguages}
                  cost={second.cost}
                  id={second._id}
                  key={second._id}
                  location={second.location}
                  name={second.name}
                />
              </Col>
            )}
            {third && (
              <Col span={8}>
                <FilterPreview
                  availableLanguages={third.availableLanguages}
                  cost={third.cost}
                  id={third._id}
                  key={third._id}
                  location={third.location}
                  name={third.name}
                />
              </Col>
            )}
          </Row>
        );
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
      languages,
      locations,
      subcategorySelected,
      openKeys,
    } = this.state;

    return (
      <Layout>
        <>
          <ResourceViewHeader
            categorySelected={categorySelected}
            subcategorySelected={subcategorySelected}
          />
          <ResourceViewFilterHeader
            costs={costs}
            languages={languages}
            locations={locations}
            handleChangeFilter={this.handleFilterChange}
          />
          <Layout style={{ background: 'white' }}>
            <Sider style={{ background: 'white', marginTop: '.8em' }}>
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
            <Content style={{ maxHeight: '65vh', overflowY: 'scroll' }}>
              <div style={{ marginLeft: 32, marginRight: 32, marginTop: 16 }}>
                {this.getGrid()}
              </div>
            </Content>
          </Layout>
        </>
      </Layout>
    );
  }
}
