// @flow

import React, { useCallback } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Radio } from 'antd';
import { useIntl, FormattedMessage } from 'react-intl';

import { filterMessages } from '../../utils/messages';
import ResourceFilterSearch from '../ResourceFilterSearch';

import '../../css/ResourcesFilter.css';

type Props = {
  costs: Array<string>,
  costSelected: string,
  languages: Array<string>,
  languageSelected: string,
  locations: Array<string>,
  locationSelected: string,
  sorts: Array<string>,
  sortSelected: string,
  setCost: (string) => void,
  setLanguage: (string) => void,
  setLocation: (string) => void,
  setSort: (string) => void,
};

function ResourcesFilter(props: Props): React$Element<'div'> {
  const {
    costs,
    costSelected,
    languages,
    languageSelected,
    locations,
    locationSelected,
    sorts,
    sortSelected,
    setCost,
    setLanguage,
    setLocation,
    setSort,
  } = props;
  const intl = useIntl();
  const translatedCost = intl.formatMessage(filterMessages.cost);
  const translatedLanguagesOffered = intl.formatMessage(
    filterMessages.languagesOffered,
  );
  const translatedLocation = intl.formatMessage(filterMessages.location);
  const translatedSort = intl.formatMessage(filterMessages.sort);

  const onChange = useCallback(
    (filterName, value) => {
      switch (filterName) {
        case translatedCost:
          setCost(value);
          break;
        case translatedLanguagesOffered:
          setLanguage(value);
          break;
        case translatedLocation:
          setLocation(value);
          break;
        case translatedSort:
          setSort(value);
          break;
        default:
      }
    },
    [
      translatedCost,
      translatedLanguagesOffered,
      translatedLocation,
      translatedSort,
      setCost,
      setLanguage,
      setLocation,
      setSort,
    ],
  );

  const radio = useCallback(
    (filterName, filterOptions, value, isSort) => (
      <div className={isSort ? 'radio-container-sort' : 'radio-container'}>
        {!isSort && <h5 className="title-filter">{filterName}</h5>}
        <Radio.Group
          onChange={(target: SyntheticInputEvent<>) =>
            onChange(filterName, target.target.value)
          }
          value={value}
        >
          {filterOptions.map((option) => (
            <Radio className="radio-filter" key={option} value={option}>
              {option}
            </Radio>
          ))}
        </Radio.Group>
      </div>
    ),
    [onChange],
  );

  return (
    <div className="resources-filter">
      <Dropdown
        overlay={radio(translatedCost, costs, costSelected, false)}
        placement="bottomLeft"
        trigger={['click']}
      >
        <Button className="button">
          <FormattedMessage {...filterMessages.cost} />
        </Button>
      </Dropdown>
      <Dropdown
        overlay={radio(
          translatedLanguagesOffered,
          languages,
          languageSelected,
          false,
        )}
        placement="bottomLeft"
        trigger={['click']}
      >
        <Button className="button">
          <FormattedMessage {...filterMessages.language} />
        </Button>
      </Dropdown>
      <Dropdown
        overlay={radio(translatedLocation, locations, locationSelected, false)}
        placement="bottomLeft"
        trigger={['click']}
      >
        <Button className="button">
          <FormattedMessage {...filterMessages.location} />
        </Button>
      </Dropdown>
      <div className="searchbar-align-right">
        <ResourceFilterSearch />
      </div>
      <div className="sort-dropdown">
        <Dropdown
          className="dropdown"
          overlay={radio(translatedSort, sorts, sortSelected, true)}
          placement="bottomRight"
          trigger={['click']}
        >
          <button
            type="button"
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
            <FormattedMessage {...filterMessages.sort} />{' '}
            <DownOutlined style={{ verticalAlign: '.2em' }} />
          </button>
        </Dropdown>
      </div>
    </div>
  );
}

export default ResourcesFilter;
