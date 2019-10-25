import React, { Component } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import '../css/Filter.css';
import FilterPreview from './FilterPreview';
import FilterCategory from './FilterCategory';
import {
  getCategories,
  getResources,
  getResourcesByCategory,
} from '../utils/api';

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

      categories: {},
      languages: ['English', 'Spanish', 'Chinese', 'Japanese'],
      locations: ['Champaign', 'Urbana', 'Maibana', 'Foopaign'],
      costs: ['$', '$$', '$$$', '$$$$$'],

      resources: [],
      filteredResources: [],
    };
  }

  async componentDidMount() {
    const resources = await getResources();
    const res = await getCategories();
    const categories = {};
    res.result.forEach(category => {
      categories[category.name] = category.subcategories;
    });
    this.setState({
      categories,
      filteredResources: resources.result,
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
    const res = await getResourcesByCategory(value);
    this.setState({
      categorySelected: value,
      costSelected: '',
      filteredResources: res.result,
      languageSelected: '',
      locationSelected: '',
      resources: res.result,
      subcategorySelected: '',
    });
  };

  subcategorySelect = value => {
    const { resources } = this.state;
    const subResources = resources.filter(
      resource => resource.subcategory === value,
    );

    this.setState({
      subcategorySelected: value,
      filteredResources: subResources,
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

  render() {
    return (
      <>
        <div className="filter-component">
          <div className="filter-component__title">
            <h1>YMCA Resource Filter</h1>
          </div>

          <div className="filter-component__filters">
            <ButtonDropdown
              isOpen={this.state.languageDropdownOpen}
              toggle={this.languageToggle}
            >
              <DropdownToggle caret>
                {this.state.languageSelected === ''
                  ? 'Language'
                  : this.state.languageSelected}
              </DropdownToggle>
              <DropdownMenu>
                {this.state.languages.map(value => {
                  return (
                    <DropdownItem onClick={() => this.languageSelect(value)}>
                      {value}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </ButtonDropdown>

            <ButtonDropdown
              isOpen={this.state.locationDropdownOpen}
              toggle={this.locationToggle}
            >
              <DropdownToggle caret>
                {this.state.locationSelected === ''
                  ? 'Location'
                  : this.state.locationSelected}
              </DropdownToggle>
              <DropdownMenu>
                {this.state.locations.map(value => {
                  return (
                    <DropdownItem onClick={() => this.locationSelect(value)}>
                      {value}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </ButtonDropdown>

            <ButtonDropdown
              isOpen={this.state.costDropdownOpen}
              toggle={this.costToggle}
            >
              <DropdownToggle caret>
                {this.state.costSelected === ''
                  ? 'Cost'
                  : this.state.costSelected}
              </DropdownToggle>
              <DropdownMenu>
                {this.state.costs.map(value => {
                  return (
                    <DropdownItem onClick={() => this.costSelect(value)}>
                      {value}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </ButtonDropdown>
          </div>

          <div className="dropdowns-container">
            {Object.keys(this.state.categories).map(categoryName => {
              return (
                <FilterCategory
                  categoryName={categoryName}
                  subcategories={this.state.categories[categoryName]}
                  categoryClickHandler={this.categorySelect}
                  subcategoryClickHandler={this.subcategorySelect}
                />
              );
            })}
          </div>

          <div className="filter-preview-container">
            {this.state.filteredResources.map(value => (
              <FilterPreview key={value.name} resourceName={value.name} />
            ))}
          </div>
        </div>
      </>
    );
  }
}
