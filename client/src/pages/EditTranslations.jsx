// @flow

import { React, useEffect, useCallback } from 'react';
import { Row, Progress, Layout, Button, message } from 'antd';

import '../css/EditTranslations.css';
import { getTextToBeTranslated } from '../utils/api';

import TranslationFormRow from '../components/TranslationFormRow';

const { Header } = Layout;

const error = () => {
  message.error('You must verify at least one translation!');
};

function Translations({ location, match }) {
  const getLanguageAndTypeFromSearch = useCallback(() => {
    const { search } = location;
    if (search === '') {
      return null;
    }

    const typeIndex = search.indexOf('&');
    const languageSelected = search.slice(
      search.indexOf('=') + 1,
      typeIndex === -1 ? search.length : typeIndex,
    );

    const typeSelected = search.slice(search.indexOf('=', typeIndex) + 1);

    return [languageSelected, typeSelected];
  }, [location]);

  useEffect(() => {
    async function fetchData() {
      const [language, type] = getLanguageAndTypeFromSearch();
      const json = await getTextToBeTranslated(match.params.id, language, type);
    }
    fetchData();
  }, [getLanguageAndTypeFromSearch, match.params.id]);
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
