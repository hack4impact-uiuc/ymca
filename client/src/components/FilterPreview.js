import React, { Component } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import '../App.css';


export default class FilterPreview extends Component<Props, State> {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        dropdownOpen: false,
      };
    }
  
    render() {
      return (
        <div className='filter-preview'>
            <div className='filter-preview-bottom'>
                
            </div>
        </div>
      );
    }
  }