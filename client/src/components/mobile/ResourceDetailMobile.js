// @flow

import React, { useState, useEffect, useCallback } from 'react';
import { Carousel, Row, Col, Rate } from 'antd';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

import ResourceDetail from '../../pages/ResourceDetail';
import useWindowDimensions from '../../utils/mobile';
import { deleteResource, getResourceByID } from '../../utils/api';
import {
  saveResource,
  deleteSavedResource,
  getSavedResources,
} from '../../utils/auth';
import ResourcesBreadcrumb from '../ResourcesBreadcrumb';
import SaveButton from '../SaveButton';

import '../../css_mobile/ResourceDetail.css';

type Props = {
  authed: Boolean,
  authRoleIsEquivalentTo: String => Boolean,
  match: {
    params: {
      id: any,
    },
  },
};

const ResourceDetailMobile = (props: Props) => {
  const { authed, authRoleIsEquivalentTo } = props;

  const resourceId = props.match.params.id;
  const isMobile = useWindowDimensions()[1];

  /* SETUP START */

  // ResourceDetail page will get all this stuff prior to this
  // being loaded but for right now everything will be fetched.
  // by this component.
  const [name, setName] = useState('Resource Name');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState([]);
  const [address, setAddress] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [aptUnitSuite, setAptUnitSuite] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [languages, setLanguages] = useState([]);
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [cost, setCost] = useState('');
  const [internalNotes, setInternalNotes] = useState([]);
  const [hours, setHours] = useState([]);
  const [recommendation, setRecommendation] = useState(0);

  const [resourceExists, setResourceExists] = useState(true);

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [eligibility, setEligibility] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  // componentDidMount
  useEffect(() => {
    async function loadResource() {
      const response = await getResourceByID(resourceId, true);

      if (response) {
        const { result } = response;

        setName(result.name);
        setCategory(result.category);
        setSubcategory(result.subcategory);
        setDescription(result.description);

        setPhone(result.phoneNumbers);
        setAddress(result.address);
        setAddressLine2(result.addressLine2);
        setCity(result.city);
        setRecommendation(result.recommendation);
      }
    }

    loadResource();
  }, [resourceId]);

  const saveResourceHandler = useCallback(async () => {
    const result = await saveResource(resourceId);
    if (result != null && result.code === 200) {
      setIsSaved(true);
    }
  }, []);

  const deleteResourceHandler = useCallback(async () => {
    const result = await deleteSavedResource(resourceId);
    if (result != null && result.code === 200) {
      setIsSaved(false);
    }
  }, []);

  // just to keep something on the screen when not on mobile
  if (!isMobile) {
    return <ResourceDetail {...props} />;
  }

  /* SETUP END */

  return (
    <div className="mb-rd-container">
      <Carousel className="mb-rd-carousel">
        <div />
        <div />
      </Carousel>
      <div className="mb-rd-block-1">
        <ResourcesBreadcrumb
          categorySelected={category}
          subcategorySelected={subcategory}
          resourceSelected={name}
        />
        <Row className="mb-rd-header-bar" type="flex">
          <Col span={18}>
            <h2 className="mb-rd-header-text">{name}</h2>
          </Col>
          <Col span={6}>
            <SaveButton
              authed={authed}
              isSaved={isSaved}
              deleteResourceHandler={deleteResourceHandler}
              saveResourceHandler={saveResourceHandler}
            />
          </Col>
        </Row>
        <Row>
          <Rate className="mb-rd-rate" disabled defaultValue={recommendation} />
        </Row>
        <Row className="mb-rd-description-container">
          <Col className="mb-rd-description">{description}</Col>
        </Row>
      </div>
    </div>
  );
};

type ImageCarouselProps = {
  images: Array<String>,
};
const ImageCarousel = (props: ImageCarouselProps) => {};

export default ResourceDetailMobile;
