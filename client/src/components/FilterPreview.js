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
    let description = [];
    let languages = '';
    this.props.resource.availableLanguages.forEach(language => {
      languages += `${language}, `;
    });
    if (languages !== '') {
      languages = languages.slice(0, languages.length - 2);
    }
    description.push(
      <div style={{ color: '#431C72' }}>{this.props.resource.cost}</div>,
    );
    description.push(<div style={{ color: 'black' }}>{languages}</div>);

    return (
      <Card
        cover={
          <img src="https://storage.googleapis.com/burbcommunity-morethanthecurve/2013/10/ymca-logo.jpg" />
        }
      >
        <Meta title={this.props.resource.name} description={description} />
      </Card>
    );
  }
}
