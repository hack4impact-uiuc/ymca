import React, { Component } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import '../App.css';
import '../css/FilterPreview.css';

export default class FilterPreview extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="filter-preview">
        <div className="filter-preview-top" />
        <div className="filter-preview-bottom">{this.props.resourceName}</div>
      </div>
    );
  }
}
