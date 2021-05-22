import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  DollarCircleFilled,
  EnvironmentOutlined,
  FolderOpenFilled,
  GlobalOutlined,
  MailOutlined,
  PhoneFilled,
  WechatFilled,
} from '@ant-design/icons';
import { Button, Col, message, Modal, Row, Layout } from 'antd';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import * as moment from 'moment';
import { useIntl, FormattedMessage } from 'react-intl';

import {
  getResourceIsVerified,
  deleteResource,
  getResourceByID,
} from '../../utils/api';
import {
  saveResource,
  deleteSavedResource,
  getSavedResources,
} from '../../utils/auth';
import ResourcesBreadcrumb from '../ResourcesBreadcrumb';
import SaveButton from '../SaveButton';
import ShareButton from '../ShareButton';
import TranslationPopup from '../TranslationPopup';
import { useAuth } from '../../utils/use-auth';
import { detailMessages, filterMessages } from '../../utils/messages';
import languageConversion from '../../utils/languages';

import '../../css/ResourceDetail.css';

const { Header } = Layout;

function ResourceDetail(props) {
  const { match } = props;

  const intl = useIntl();
  const { authed, authRoleIsEquivalentTo } = useAuth();

  const [isVerified, setIsVerified] = useState(false);

  const [name, setName] = useState('Resource Name');
  const [phone, setPhone] = useState([]);
  const [address, setAddress] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [aptUnitSuite, setAptUnitSuite] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [languages, setLanguages] = useState([]);
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [cost, setCost] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [resourceExists, setResourceExists] = useState(true);
  const [lat, setLat] = useState(0.0);
  const [lng, setLng] = useState(0.0);
  const [eligibility, setEligibility] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [internalNotes, setInternalNotes] = useState([]);
  const [hours, setHours] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [addressString, setAddresString] = useState('');
  const [financialAidDetails, setFinancialAidDetails] = useState(null);
  const [contacts, setContacts] = useState(null);

  const updateIsSaved = useCallback(
    (savedSet) => {
      setIsSaved(!!savedSet.has(match.params.id));
    },
    [match.params.id],
  );

  useEffect(() => {
    async function didMount() {
      const response = await getResourceByID(match.params.id, true);
      if (response !== null) {
        const { result } = response;
        setName(result.name);
        setPhone(result.phoneNumbers);
        setAddress(result.address || '');
        setAddressLine2(result.addressLine2 || '');
        setAptUnitSuite(result.aptUnitSuite || '');
        setCity(result.city || '');
        setState(result.state || '');
        setZip(result.zip || '');
        setDescription(result.description);
        setLanguages(result.availableLanguages);
        setCategory(result.category[0]);
        setSubcategory(result.subcategory[0]);
        setCost(result.cost);
        setLat(
          result?.geoLocation === null ||
          result?.geoLocation === undefined ||
            result?.geoLocation?.coordinates === null ||
            result?.geoLocation?.coordinates === undefined ||
            Number.isNaN(result?.geoLocation?.coordinates[1])
            ? 0.0
            : result?.geoLocation?.coordinates[1],
        );
        setLng(
          result?.geoLocation === null ||
          result?.geoLocation === undefined ||
            result?.geoLocation?.coordinates === null ||
            result?.geoLocation?.coordinates === undefined ||
            Number.isNaN(result?.geoLocation?.coordinates[0])
            ? 0.0
            : result?.geoLocation?.coordinates[0],
        );
        setEmail(result.email ?? '');
        setWebsite(result.website ?? '');
        setEligibility(result.eligibilityRequirements);
        setInternalNotes(result.internalNotes);
        setHours(
          result.hoursOfOperation
            ? result.hoursOfOperation.hoursOfOperation
            : [],
        );
        setRequiredDocuments(result.requiredDocuments);
        setFinancialAidDetails(result.financialAidDetails);
        setContacts(result.contacts);

        if (authed) {
          let savedSet = new Set();
          const json = await getSavedResources();
          savedSet = new Set(json.result);
          updateIsSaved(savedSet);
        }
      } else {
        // redirect to resource unknown page
        setResourceExists(false);
      }
    }
    didMount();
  }, [authed, match.params.id, updateIsSaved]);

  useEffect(() => {
    async function didUpdate() {
      if (authed) {
        let savedSet = new Set();
        const json = await getSavedResources();
        savedSet = new Set(json.result);
        updateIsSaved(savedSet);
      }
    }
    didUpdate();
  }, [authed, updateIsSaved]);

  useEffect(() => {
    async function fetchData() {
      const language = localStorage.getItem('language');
      if (language !== 'English') {
        const response = await getResourceIsVerified(match.params.id, language);
        setIsVerified(response.result);
      } else {
        setIsVerified(true);
      }
    }
    fetchData();
  }, [match.params.id]);

  useEffect(() => {
    let adr = intl.formatMessage(detailMessages.noAddress);
    if (address.length > 0) {
      adr = address;
      if (addressLine2.length > 0) {
        adr += `, ${addressLine2}`;
      }
      if (aptUnitSuite.length > 0) {
        adr += ` ${aptUnitSuite}`;
      }
      if (city.length > 0) {
        adr += `, ${city}`;
      }
      if (state.length > 0) {
        adr += `, ${state}`;
      }
      if (zip.length > 0) {
        adr += ` ${zip}`;
      }
    }
    setAddresString(adr);
  }, [address, addressLine2, aptUnitSuite, city, intl, state, zip]);

  const showModal = () => {
    setModalVisible(true);
  };

  const isOpen = (hrs) => {
    if (hrs === null || hrs.length === 0) {
      return false;
    }

    const format = 'hh:mm a';
    const currentTime = moment();
    let dayIndex = new Date().getDay();

    if (dayIndex < 0) {
      dayIndex += 7;
    }

    const currentDay = hrs[dayIndex];
    const open = moment(currentDay.period[0], format);
    const close = moment(currentDay.period[1], format);

    return currentTime.isBetween(open, close);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const displayNote = (note) => {
    if (note.body.length > 0) {
      if (note.subject.length > 0) {
        return <li>{`${note.subject}: ${note.body}`}</li>;
      }
      return <li>{note.body}</li>;
    }
    return null;
  };

  const saveResourceHandler = async () => {
    const result = await saveResource(props.match.params.id);
    if (result !== null && result !== undefined && result.code === 200) {
      setIsSaved(true);
    }
  };

  const deleteSavedResourceHandler = async () => {
    const result = await deleteSavedResource(props.match.params.id);
    if (result !== null && result !== undefined && result.code === 200) {
      setIsSaved(false);
    }
  };

  const deleteResourceHandler = async (id) => {
    const deletedResource = await deleteResource(id);
    if (deletedResource) {
      message.success('Resource successfully deleted!');
    } else {
      message.error(`Resource failed to be deleted.`);
      return;
    }
    props.history.push('/resources');
  };

  const translatedRequiredDocuments = useMemo(
    () =>
      requiredDocuments.map((requiredDocument, idx) =>
        intl.formatMessage({
          id: `resource-requiredDoc-${match.params.id}-${idx}`,
          defaultMessage: requiredDocument,
        }),
      ),
    [match.params.id, requiredDocuments, intl],
  );

  const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiYW5vb2psYWwiLCJhIjoiY2syemtiYjZoMGp1' +
      'eDNscXQ3azJzajl0bCJ9.FDSFjP1IfSisbm4uvd70vg',
    interactive: true,
  });

  if (!resourceExists) {
    return <Redirect to="/resources/unknown" />;
  }

  let absoluteWebsiteURL = website;
  if (website.includes('http') === false) {
    absoluteWebsiteURL = `//${website}`;
  }

  let textCost = cost;
  if (cost !== null && cost !== undefined) {
    if (cost === 'Free') {
      textCost = <FormattedMessage {...filterMessages.free} />;
    }
  } else {
    textCost = <FormattedMessage {...detailMessages.noneProvided} />;
  }

  return (
    <div className="resource-detail">
      <Modal
        title="Confirm Delete"
        visible={modalVisible}
        onOk={() => deleteResourceHandler(match.params.id)}
        onCancel={handleCancel}
      >
        Are you sure you want to delete this resource? Warning: this cannot be
        undone.
      </Modal>
      <Header className="banner" type="flex" justify="center">
        <Row style={{ paddingTop: '2%' }}>
          <ResourcesBreadcrumb
            categorySelected={category}
            subcategorySelected={subcategory}
            resourceSelected={name}
          />
        </Row>
      </Header>
      <Row className="section">
        <Col span={15}>
          <span className="resource-name">{name}</span>
          {!isVerified && (
            <TranslationPopup id={match.params.id} type="resource" />
          )}
          <br />
          <SaveButton
            isSaved={isSaved}
            deleteResourceHandler={deleteSavedResourceHandler}
            saveResourceHandler={saveResourceHandler}
            fullButton
          />
          <ShareButton fullButton />
          {authed && authRoleIsEquivalentTo('admin') && (
            <span className="resource-edit-delete">
              <Button href={`/admin/${match.params.id}`}>Edit</Button>
              <span className="resource-delete">
                <Button type="danger" ghost="true" onClick={showModal}>
                  Delete
                </Button>
              </span>
            </span>
          )}
        </Col>
        <Col span={9} className="header-info">
          <div className="info-row">
            <GlobalOutlined />
            {website.length > 0 ? (
              <a
                href={absoluteWebsiteURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${website}`}
                {'\n'}
              </a>
            ) : (
              `${intl.formatMessage(detailMessages.noWebsite)}\n`
            )}
          </div>
          <div className="info-row">
            <MailOutlined />
            {email.length > 0
              ? `${email}\n`
              : `${intl.formatMessage(detailMessages.noEmail)}\n`}
          </div>
          <div className="info-row">
            <PhoneFilled />
            {phone.length > 0
              ? phone.map(
                  (p) =>
                    `${intl.formatMessage({
                      id: `resource-phoneType-${p._id}`,
                      defaultMessage: p.phoneType,
                    })}: ${p.phoneNumber}\n`,
                )
              : `${intl.formatMessage(detailMessages.noPhoneNumber)}\n`}
          </div>
          <div className="info-row">
            <EnvironmentOutlined />
            {addressString}
          </div>
        </Col>
      </Row>
      <Row className="section card-row">
        <Col span={24}>
          {description.length > 0 ? (
            <FormattedMessage
              id={`resource-description-${match.params.id}`}
              defaultMessage={description}
            />
          ) : (
            <FormattedMessage {...detailMessages.noDescription} />
          )}
          {eligibility &&
            `\n\n${intl.formatMessage(
              detailMessages.eligibility,
            )}: ${intl.formatMessage({
              id: `resource-eligibilityRequirements-${match.params.id}`,
              defaultMessage: eligibility,
            })}`}
        </Col>
      </Row>
      <Row>
        <Col span={24} className="section-label card-row">
          <FormattedMessage {...detailMessages.basicInfo} />
        </Col>
      </Row>
      <Row className="card-row">
        <Col span={1}>
          <FolderOpenFilled />
        </Col>
        <Col span={11}>
          <div className="card-label">
            <FormattedMessage {...detailMessages.requiredDoc} /> {'\n'}
          </div>
          {requiredDocuments.length > 0 ? (
            translatedRequiredDocuments.join(', ')
          ) : (
            <FormattedMessage {...detailMessages.noneProvided} />
          )}
        </Col>
        <Col span={1}>
          <DollarCircleFilled />
        </Col>
        <Col span={11}>
          <div className="card-label">
            <FormattedMessage {...filterMessages.cost} />
            {'\n'}
          </div>
          {textCost}
        </Col>
      </Row>
      <Row className="card-row">
        <Col span={1}>
          <WechatFilled />
        </Col>
        <Col span={11}>
          <div className="card-label">
            <FormattedMessage {...detailMessages.languagesSpoken} />
            {'\n'}
          </div>
          {languages.length > 0 ? (
            languages.map((language, index) =>
              index < languages.length - 1
                ? `${languageConversion[language]}, `
                : languageConversion[language],
            )
          ) : (
            <FormattedMessage {...detailMessages.noneProvided} />
          )}
        </Col>
        <Col span={1}>
          <img
            className="financial-aid-icon"
            src="/asset/icon/give-money-gray.svg"
            alt="give-money-gray.svg"
            height="20"
            width="20"
          />
        </Col>
        <Col span={11}>
          <div className="card-label">
            <FormattedMessage {...detailMessages.financialAid} />
            {'\n'}
          </div>
          {financialAidDetails &&
          (financialAidDetails.education ||
            financialAidDetails.immigrationStatus ||
            financialAidDetails.deadline ||
            financialAidDetails.amount) ? (
            <div>
              <Row
                justify="space-between"
                style={{ paddingLeft: 0, paddingBottom: 0 }}
              >
                <Col span={12}>
                  <div className="financial-aid-subtitle">
                    <FormattedMessage {...detailMessages.education} />:
                  </div>
                  {financialAidDetails.education ? (
                    <FormattedMessage
                      id={
                        'resource-financialAid-education-' +
                        `${financialAidDetails._id}`
                      }
                      defaultMessage={financialAidDetails.education}
                    />
                  ) : (
                    <FormattedMessage {...detailMessages.noneProvided} />
                  )}
                </Col>
                <Col span={12}>
                  <div className="financial-aid-subtitle">
                    <FormattedMessage {...detailMessages.immigrationStatus} />:
                  </div>
                  {financialAidDetails.immigrationStatus ? (
                    <FormattedMessage
                      id={
                        'resource-financialAid-immigrationStatus-' +
                        `${financialAidDetails._id}`
                      }
                      defaultMessage={financialAidDetails.immigrationStatus}
                    />
                  ) : (
                    <FormattedMessage {...detailMessages.noneProvided} />
                  )}
                </Col>
              </Row>
              <Row
                justify="space-between"
                style={{ paddingLeft: 0, paddingBottom: 0 }}
              >
                <Col span={12}>
                  <div className="financial-aid-subtitle">
                    <FormattedMessage {...detailMessages.deadline} />:
                  </div>
                  {financialAidDetails.deadline ? (
                    <FormattedMessage
                      id={
                        'resource-financialAid-deadline-' +
                        `${financialAidDetails._id}`
                      }
                      defaultMessage={financialAidDetails.deadline}
                    />
                  ) : (
                    <FormattedMessage {...detailMessages.noneProvided} />
                  )}
                </Col>
                <Col span={12}>
                  <div className="financial-aid-subtitle">
                    <FormattedMessage {...detailMessages.amount} />:
                  </div>
                  {financialAidDetails.amount ? (
                    <FormattedMessage
                      id={
                        'resource-financialAid-amount-' +
                        `${financialAidDetails._id}`
                      }
                      defaultMessage={financialAidDetails.amount}
                    />
                  ) : (
                    <FormattedMessage {...detailMessages.noneProvided} />
                  )}
                </Col>
              </Row>
            </div>
          ) : (
            <FormattedMessage {...detailMessages.noneProvided} />
          )}
        </Col>
      </Row>
      {authRoleIsEquivalentTo('admin') && (
        <div>
          <Row className="section">
            <Col span={24} className="recommended-contacts-label">
              Recommended Contacts
            </Col>
          </Row>
          <Row className="section recommended-contacts-row">
            {contacts &&
              contacts.map((contact) => (
                <Col span={8} className="contact" key={contact.name}>
                  <div className="financial-aid-subtitle">{contact.name}</div>
                  <div>
                    Role:{' '}
                    <span className="recommended-contacts-info">
                      {contact.role || (
                        <FormattedMessage {...detailMessages.noneProvided} />
                      )}
                    </span>
                  </div>
                  <div>
                    Email:{' '}
                    <span className="recommended-contacts-info">
                      {contact.email || (
                        <FormattedMessage {...detailMessages.noneProvided} />
                      )}
                    </span>
                  </div>
                  <div>
                    Phone Number:{' '}
                    <span className="recommended-contacts-info">
                      {contact.phoneNumber || (
                        <FormattedMessage {...detailMessages.noneProvided} />
                      )}
                    </span>
                  </div>
                  <div>
                    Note:{' '}
                    <span className="recommended-contacts-info">
                      {contact.note || (
                        <FormattedMessage {...detailMessages.noneProvided} />
                      )}
                    </span>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      )}
      <Row>
        <Col span={24} className="section-label card-row">
          <FormattedMessage {...detailMessages.locationAndHours} />
        </Col>
      </Row>
      <Row className="card-row">
        <Col span={12}>{addressString}</Col>
        {isOpen(hours) && (
          <Col span={12} className="open-now">
            <FormattedMessage {...detailMessages.openNow} />
          </Col>
        )}
        {hours.length === 0 && (
          <Col span={12}>
            <FormattedMessage {...detailMessages.noSchedule} />
          </Col>
        )}
      </Row>
      <Row className="card-row">
        {address && (
          <Col span={12}>
            <Map
              // eslint-disable-next-line
              style="mapbox://styles/mapbox/light-v9"
              center={[lng, lat]}
              containerStyle={{
                height: '350px',
                width: '400px',
              }}
              zoom={[15]}
            >
              <Layer
                type="symbol"
                id="marker"
                layout={{ 'icon-image': 'marker-15' }}
              >
                <Feature coordinates={[lng, lat]} />
              </Layer>
            </Map>
          </Col>
        )}
        {hours.length > 0 && (
          <Col span={12}>
            {hours.map((day) => (
              <div key={day}>
                <span className="day-of-week">{`${intl.formatMessage({
                  id: `detail-${day.day}`,
                  defaultMessage: day.day,
                })}: `}</span>
                {day.period.length > 0 ? (
                  `${day.period[0]} - ${day.period[1]}`
                ) : (
                  <FormattedMessage {...detailMessages.none} />
                )}
              </div>
            ))}
          </Col>
        )}
      </Row>
      {authRoleIsEquivalentTo('admin') && (
        <Row className="section">
          <Col span={4} className="section-label">
            Internal Notes
          </Col>
          <Col span={20}>
            <Row className="cardRow">
              {internalNotes.length > 0
                ? internalNotes.map(displayNote)
                : 'No internal notes provided'}
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
}

ResourceDetail.defaultProps = {
  match: null,
  history: null,
};

ResourceDetail.propTypes = {
  history: PropTypes.element,
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }),
};

export default ResourceDetail;
