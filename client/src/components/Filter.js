import React, { Component } from 'react';
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { Col, Layout, Menu, Row } from 'antd';

import '../css/Filter.css';
import FilterPreview from './FilterPreview';
import FilterCategory from './FilterCategory';
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
    res.result.forEach(category => {
      if (categorySelected === null) {
        categorySelected = category.name;
      }
      categories[category.name] = category.subcategories;
    });
    const resources = await getResourcesByCategory(categorySelected);
    this.setState({
      categories,
      categorySelected,
      filteredResources: resources.result,
      openKeys: [categorySelected],
      resources: resources.result,
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

  render() {
    const grid = Array(Math.ceil(this.state.filteredResources.length / 2))
      .fill()
      .map((_, index) => {
        const first = this.state.filteredResources[index * 2];
        const second =
          index * 2 + 1 < this.state.filteredResources.length
            ? this.state.filteredResources[index * 2 + 1]
            : null;
        return (
          <Row gutter={[32, 32]}>
            <Col span={12}>
              <FilterPreview key={first.name} resource={first} />
            </Col>
            {second && (
              <Col span={12}>
                <FilterPreview key={second.name} resource={second} />
              </Col>
            )}
          </Row>
        );
      });

    return (
      <Layout>
        <div>
          <Header style={{ background: 'white' }}>
            <h1>{this.state.categorySelected}</h1>
          </Header>
          <Layout style={{ background: 'white' }}>
            <Sider style={{ background: 'white' }}>
              <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
              >
                {Object.keys(this.state.categories).map(categoryName => {
                  return (
                    <SubMenu
                      key={categoryName}
                      title={categoryName}
                      onTitleClick={() => this.categorySelect(categoryName)}
                    >
                      {this.state.categories[categoryName].map(subCategory => {
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
            <Content style={{ maxHeight: "80vh", overflowY: 'scroll' }}>
              <div style={{ marginLeft: 32, marginRight: 32, marginTop: 16 }}>
                {grid}
              </div>
            </Content>
            <Sider style={{ background: 'white' }}>
              <Menu
                mode="inline"
                selectedKeys={[
                  this.state.languageSelected,
                  this.state.locationSelected,
                  this.state.costSelected,
                ]}
              >
                <SubMenu key="language" title="Language">
                  {this.state.languages.map(value => {
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
                  {this.state.locations.map(value => {
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
                  {this.state.costs.map(value => {
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
