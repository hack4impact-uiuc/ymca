// @flow

import React from 'react';
import { Row, Progress, Checkbox, Layout, Button, Input } from 'antd';

import '../css/EditTranslations.css';

const { Header } = Layout;

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

function Translations() {
  return (
    <div className="edit-translations">
      <Header className="header">
        <Row justify="left" type="flex">
          <h2>Edit Resource Translations</h2>
        </Row>
      </Header>

      <div>
        <div className="title">
          <div> </div>
          <div>English</div>
          <div className="to-translate-language">Español</div>
          <div>Verified?</div>
        </div>
        <div className="translation-container">
          <div className="resource-description">Resource Descriptions</div>
          <div className="text-to-translate">
            Assist with insurance applications, community care applications, and
            general orientation of the health care system.
          </div>
          <div className="translation-input">
            <Input placeholder="Translation" />
          </div>
          <Checkbox onChange={onChange} className="checkbox-translation">
            {' '}
          </Checkbox>
        </div>
        <div className="grid">
          <div>
            <div className="progress-bar-text">0/11 translations verified</div>
            <Progress
              percent={30}
              strokeColor="purple"
              className="progress-bar"
              showInfo={false}
            />
          </div>
          <div className="submit-button-wrapper">
            <Button type="primary" className="submit-button">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Translations;
