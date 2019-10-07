import React, { Component } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import '../App.css';
import '../css/Filter.css';

export default class Filter extends Component<Props, State> {
  constructor(props) {
    super(props);
    
    this.state = {
      categoryDropdownOpen: false,
      subcategoryDropdownOpen: false,
      languageDropdownOPen: false,

      categorySelected: '',
      subcategorySelected: '',
      languageSelected: '',

      categoryDropdownOpenItems: {
        'Abuse, Domestic Violence, Exploitation': ['1','2','3'],
        'Children Park Registration': ['4','5','6'],
        'Drug Alcohol Addiction Treatment': ['7','8','9'],
        'Education Adult': ['10','11','12'],
        'Employment': ['13','14','15']
      },
      languages: ["English", "Spanish", "Chinese", "Japanese"]

    };
  }

  categoryToggle = () => {
    this.setState({
      categoryDropdownOpen: !this.state.categoryDropdownOpen,
    });
  }
  categorySelect = value => {
    this.setState({
      categorySelected: value,
      subcategorySelected: ''
    });
  }
  subcategoryToggle = () => {
    this.setState({
      subcategoryDropdownOpen: !this.state.subcategoryDropdownOpen,
    });
  }
  subcategorySelect = value => {
    this.setState({
      subcategorySelected: value
    });
  }

  languageToggle = () => {
    this.setState({
      languageDropdownOPen: !this.state.languageDropdownOPen,
    });
  }
  languageSelect = value => {
    this.setState({
      languageSelected: value
    });
  }


  render() {
    return (
      <div className="filter-component">
        <div className="dropdowns">
          <ButtonDropdown isOpen={this.state.categoryDropdownOpen} toggle={this.categoryToggle}>
            <DropdownToggle caret>{(this.state.categorySelected=='') ? 'Resource Category': this.state.categorySelected}</DropdownToggle>
            <DropdownMenu>
              {Object.keys(this.state.categoryDropdownOpenItems).map((value, index) => {
                return (
                  <DropdownItem >
                    <div onClick={() => this.categorySelect(value)}>
                      {value}
                    </div>
                  </DropdownItem>)
              })}
            </DropdownMenu>
          </ButtonDropdown>

          <ButtonDropdown isOpen={this.state.subcategoryDropdownOpen} toggle={this.subcategoryToggle}>
            <DropdownToggle caret>{(this.state.subcategorySelected=='') ? 'Resource Subcategory': this.state.subcategorySelected}</DropdownToggle>
            <DropdownMenu>
              {this.state.categorySelected != '' && (this.state.categoryDropdownOpenItems[this.state.categorySelected]).map((value, index) => {
                return (
                  <DropdownItem >
                    <div onClick={() => this.subcategorySelect(value)}>
                      {value}
                    </div>
                  </DropdownItem>)
              })}
            </DropdownMenu>
          </ButtonDropdown>

          <ButtonDropdown isOpen={this.state.languageDropdownOPen} toggle={this.languageToggle}>
            <DropdownToggle caret>{(this.state.languageSelected=='') ? 'Language': this.state.languageSelected}</DropdownToggle>
            <DropdownMenu>
              {(this.state.languages).map((value, index) => {
                return (
                  <DropdownItem >
                    <div onClick={() => this.languageSelect(value)}>
                      {value}
                    </div>
                  </DropdownItem>)
              })}
            </DropdownMenu>
          </ButtonDropdown>
        </div>

        <div className='filter-preview'>
          
        </div>
      </div>
    );
  }
}


