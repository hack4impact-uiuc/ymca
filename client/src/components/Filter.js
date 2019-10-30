import React, { Component } from 'react';
import { Col, Layout, Menu, Row } from 'antd';

import '../css/Filter.css';
import FilterPreview from './FilterPreview';
import FilterHeader from './FilterHeader';
import {
  getCategories,
  getResources,
  getResourcesByCategory,
} from '../utils/api';

const { Header, Sider, Content } = Layout;
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
      languages: ['English', 'Spanish', 'Chinese', 'Japanese'],
      locations: ['Champaign', 'Urbana', 'Maibana', 'Foopaign'],
      costs: ['$', '$$', '$$$', '$$$$$'],

      resources: [],
      filteredResources: [],
    };
  }

  async componentDidMount() {
    const res = await getCategories();
    const categories = {};
    let categorySelected = null;
    if (res != null) {
      res.result.forEach(category => {
        if (categorySelected === null) {
          categorySelected = category.name;
        }
        categories[category.name] = category.subcategories;
      });
    }
    const resources = await getResourcesByCategory(categorySelected);
    this.setState({
      categories,
      categorySelected,
      filteredResources: resources == null ? [] : resources.result,
      openKeys: [categorySelected],
      resources: resources == null ? [] : resources.result,
    });
  }

  filterResources = (cost, language, location, subcategory) => {
    const { resources } = this.state;
    const filteredResources = resources.filter(
      resource =>
        (resource.cost === cost || cost === '') &&
        (resource.subcategory === subcategory || subcategory === '') &&
        (resource.availableLanguages.includes(language) || language === '') &&
        (resource.city === location || location === ''),
    );
    this.setState({ filteredResources });
  };

  categorySelect = async value => {
    let res = null;
    let categorySelected = '';
    // Opening the menu
    if (this.state.categorySelected !== value) {
      categorySelected = value;
      res = await getResourcesByCategory(value);
    }
    this.setState({
      categorySelected,
      costSelected: '',
      filteredResources: res === null ? [] : res.result,
      languageSelected: '',
      locationSelected: '',
      resources: res === null ? [] : res.result,
      subcategorySelected: '',
    });
  };

  subcategorySelect = value => {
    const {
      costSelected,
      filteredResources,
      languageSelected,
      locationSelected,
      subcategorySelected,
    } = this.state;
    if (subcategorySelected === '') {
      const newFilteredResources = filteredResources.filter(
        resource => resource.subcategory === value,
      );
      this.setState({
        subcategorySelected: value,
        filteredResources: newFilteredResources,
      });
    } else {
      this.filterResources(
        costSelected,
        languageSelected,
        locationSelected,
        value,
      );
      this.setState({
        subcategorySelected: value,
      });
    }
  };

  languageToggle = () => {
    this.setState(prevState => ({
      languageDropdownOpen: !prevState.languageDropdownOpen,
    }));
  };

  languageSelect = value => {
    const {
      costSelected,
      filteredResources,
      languageSelected,
      locationSelected,
      subcategorySelected,
    } = this.state;
    if (languageSelected === '') {
      const newFilteredResources = filteredResources.filter(resource =>
        resource.availableLanguages.includes(value),
      );
      this.setState({
        languageSelected: value,
        filteredResources: newFilteredResources,
      });
    } else {
      this.filterResources(
        costSelected,
        value,
        locationSelected,
        subcategorySelected,
      );
      this.setState({
        languageSelected: value,
      });
    }
  };

  locationToggle = () => {
    this.setState(prevState => ({
      locationDropdownOpen: !prevState.locationDropdownOpen,
    }));
  };

  locationSelect = value => {
    const {
      costSelected,
      filteredResources,
      languageSelected,
      locationSelected,
      subcategorySelected,
    } = this.state;
    if (locationSelected === '') {
      const newFilteredResources = filteredResources.filter(
        resource => resource.city === value,
      );
      this.setState({
        locationSelected: value,
        filteredResources: newFilteredResources,
      });
    } else {
      this.filterResources(
        costSelected,
        languageSelected,
        value,
        subcategorySelected,
      );
      this.setState({
        locationSelected: value,
      });
    }
  };

  costToggle = () => {
    this.setState(prevState => ({
      costDropdownOpen: !prevState.costDropdownOpen,
    }));
  };

  costSelect = value => {
    const {
      costSelected,
      filteredResources,
      languageSelected,
      locationSelected,
      subcategorySelected,
    } = this.state;
    if (costSelected === '') {
      const newFilteredResources = filteredResources.filter(
        resource => resource.cost === value,
      );
      this.setState({
        costSelected: value,
        filteredResources: newFilteredResources,
      });
    } else {
      this.filterResources(
        value,
        languageSelected,
        locationSelected,
        subcategorySelected,
      );
      this.setState({
        costSelected: value,
      });
    }
  };

  onOpenChange = openKeys => {
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
                  name={third.name}
                />
              </Col>
            )}
          </Row>
        );
      });
  };

  render() {
    const {
      categories,
      categorySelected,
      costs,
      costSelected,
      languages,
      languageSelected,
      locations,
      locationSelected,
      subcategorySelected,
      openKeys,
    } = this.state;

    return (
      <Layout>
        <div>
          <FilterHeader
            categorySelected={categorySelected}
            subcategorySelected={subcategorySelected}
          />
          <Layout style={{ background: 'white' }}>
            <Sider style={{ background: 'white' }}>
              <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={this.onOpenChange}
              >
                {Object.keys(categories).map(categoryName => {
                  return (
                    <SubMenu
                      key={categoryName}
                      title={categoryName}
                      onTitleClick={() => this.categorySelect(categoryName)}
                    >
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
            <Sider style={{ background: 'white' }}>
              <Menu
                mode="inline"
                selectedKeys={[
                  languageSelected,
                  locationSelected,
                  costSelected,
                ]}
              >
                <SubMenu key="language" title="Language">
                  {languages.map(value => {
                    return (
                      <Menu.Item
                        key={value}
                        onClick={() => this.languageSelect(value)}
                      >
                        {value}
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
                <SubMenu key="location" title="Location">
                  {locations.map(value => {
                    return (
                      <Menu.Item
                        key={value}
                        onClick={() => this.locationSelect(value)}
                      >
                        {value}
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
                <SubMenu key="cost" title="Cost">
                  {costs.map(value => {
                    return (
                      <Menu.Item
                        key={value}
                        onClick={() => this.costSelect(value)}
                      >
                        {value}
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              </Menu>
            </Sider>
          </Layout>
        </div>
      </Layout>
    );
  }
}
