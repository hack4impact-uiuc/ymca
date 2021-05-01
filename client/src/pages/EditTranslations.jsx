// @flow

import { React, useEffect, useState, useCallback } from 'react';
import { Row, Progress, Layout, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';

import '../css/EditTranslations.css';
import { getTextToBeTranslated } from '../utils/api';

import TranslationFormRow from '../components/TranslationFormRow';

const { Header } = Layout;

const error = () => {
  message.error('You must verify at least one translation!');
};

function Translations({ location, match }) {
  const history = useHistory();

  const [textToTranslate, setTextToTranslate] = useState([]);
  const [language, setLanguage] = useState('');

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
      const [lang, type] = getLanguageAndTypeFromSearch();
      setLanguage(lang);
      const json = await getTextToBeTranslated(match.params.id, lang, type);
      setTextToTranslate(json.result);
    }
    fetchData();
  }, [getLanguageAndTypeFromSearch, match.params.id]);

  const rows = textToTranslate.map((verificationObject, idx) => {
    const key = Object.keys(verificationObject)[0];
    return (
      <TranslationFormRow
        key={key}
        onCheck={(translationId, isChecked) => {
          setTextToTranslate((prevText) => {
            const copy = [...prevText];
            copy[idx][translationId].verified = isChecked;
            return copy;
          });
        }}
        translationId={key}
        text={verificationObject[key].English}
        translation={verificationObject[key][language]}
      />
    );
  });

  const numTranslated = textToTranslate.reduce(
    (acc, text) => acc + (text[Object.keys(text)[0]].verified ? 1 : 0),
    0,
  );

  const onSubmit = () => {
    if (numTranslated >= 1) {
      history.push(`/translations`);
    } else {
      error();
    }
  };

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
          <div className="to-translate-language">{language}</div>
          <div>Verified?</div>
        </div>
        {rows}
        <div className="grid">
          <div>
            <div className="progress-bar-text">
              {numTranslated}/{textToTranslate.length} translations verified
            </div>
            <Progress
              percent={(numTranslated / textToTranslate.length) * 100}
              strokeColor="purple"
              className="progress-bar"
              showInfo={false}
            />
          </div>
          <div className="submit-button-wrapper">
            <Button type="primary" onClick={onSubmit} className="submit-button">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Translations;
