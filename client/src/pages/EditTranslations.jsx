// @flow

import React from 'react';
import { Row, Progress, Layout, Button, message } from 'antd';

import '../css/EditTranslations.css';

import TranslationFormRow from '../components/TranslationFormRow';

const { Header } = Layout;

const error = () => {
  message.error('You must verify at least one translation!');
};

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
        <TranslationFormRow />
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
            <Button type="primary" onClick={error} className="submit-button">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Translations;
