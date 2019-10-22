import React, { Component } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import '../css/App.css';
import '../css/Filter.css';
import AppNavbar from './AppNavbar';
import FilterPreview from './FilterPreview';
import FilterCategory from './FilterCategory';

const BACKEND_URL = 'http://localhost:9000/';

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

      categories: {
        Abuse: ['Abuse Sub 1', 'Abuse Sub 2', 'Abuse Sub 3'],
        'Children Park Registration': [
          'Children 4',
          'Children 5',
          'Children 6',
        ],
        'Addiction Treatment': ['Addiction 7', 'Addiction 8', 'Addiction 9'],
        'Education Adult': ['Education 10', 'Education 11', 'Education 12'],
        Employment: ['Employment 13', 'Employment 14', 'Employment 15'],
      },
      languages: ['English', 'Spanish', 'Chinese', 'Japanese'],
      locations: ['Champaign', 'Urbana', 'Maibana', 'Foopaign'],
      costs: ['$', '$$', '$$$', '$$$$$'],

      resources: [],
    };
  }

  componentDidMount() {
    fetch(`${BACKEND_URL}api/categories`)
      .then(res => res.json())
      .then(data => {
        const categories = {};
        data.result.map(category => {
          categories[category.name] = category.subcategories;
        });
        this.setState({ categories });
      });
  }

  categorySelect = value => {
    this.setState({
      categorySelected: value,
      subcategorySelected: '',
    });
    fetch(`${BACKEND_URL}api/resources?category=${value}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ resources: data.result });
      });
    // console.log(this.state.resources)
  };

  subcategorySelect = value => {
    this.setState({
      subcategorySelected: value,
      resources: ['Dummy Resource A', 'Dummy Resource B', 'Dummy Resource C'],
    });
  };

  languageToggle = () => {
    this.setState(prevState => ({
      languageDropdownOpen: !prevState.languageDropdownOpen,
    }));
  };

  languageSelect = value => {
    this.setState({
      languageSelected: value,
    });
  };

  locationToggle = () => {
    this.setState(prevState => ({
      locationDropdownOpen: !prevState.locationDropdownOpen,
    }));
  };

  locationSelect = value => {
    this.setState({
      locationSelected: value,
    });
  };

  costToggle = () => {
    this.setState(prevState => ({
      costDropdownOpen: !prevState.costDropdownOpen,
    }));
  };

  costSelect = value => {
    this.setState({
      costSelected: value,
    });
  };

  render() {
    return (
      <>
        <AppNavbar />
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

          {(this.state.subcategorySelected !== '' ||
            this.state.categorySelected !== '') && (
            <div className="filter-preview-container">
              {this.state.resources.map(value => {
                return <FilterPreview resourceName={value.name} />;
              })}
            </div>
          )}
        </div>
      </>
    );
  }
}
