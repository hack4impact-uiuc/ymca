import React, { Component } from 'react';
import { Collapse, Button, Card } from 'reactstrap';
import PropTypes from 'prop-types';
import '../css/App.css';
import '../css/Filter.css';

export default class FilterCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false };
  }

  categoryToggle = value => {
    this.setState(state => ({ collapse: !state.collapse }));
    this.props.categoryClickHandler(value);
  };

  render() {
    return (
      <div>
        <Button
          color="primary"
          onClick={() => this.categoryToggle(this.props.categoryName)}
        >
          {this.props.categoryName}
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            {this.props.subcategories.map(value => {
              return (
                <Button
                  color="secondary"
                  onClick={() => this.props.subcategoryClickHandler(value)}
                >
                  {value}
                </Button>
              );
            })}
          </Card>
        </Collapse>
      </div>
    );
  }
}

FilterCategory.propTypes = {
  categoryClickHandler: PropTypes.func.isRequired,
  subcategoryClickHandler: PropTypes.func.isRequired,
  categoryName: PropTypes.string.isRequired,
  // subcategoryName: PropTypes.string.isRequired,
  subcategories: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.string))
    .isRequired,
};
