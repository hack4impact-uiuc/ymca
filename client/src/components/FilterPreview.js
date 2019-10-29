import React, { Component } from 'react';
import '../css/FilterPreview.css';
import { Card } from 'antd';

const { Meta } = Card;

export default class FilterPreview extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let description = "";
    this.props.resource.availableLanguages.forEach(language => description += `${language} • `)
    description += this.props.resource.cost;
    return (
      <Card
        cover={
          <img src="https://storage.googleapis.com/burbcommunity-morethanthecurve/2013/10/ymca-logo.jpg" />
        }
      >
        <Meta
          title={this.props.resource.name}
          description={description}
        />
      </Card>
    );
  }
}
