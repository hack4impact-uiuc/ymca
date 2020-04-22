import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import '../css/Resources.css';
import Loader from 'react-loader-spinner';
import { Redirect } from 'react-router-dom';

import { getResources } from '../utils/api';
import { getSavedResources } from '../utils/auth';
import useWindowDimensions from '../utils/mobile';
import ResourcesBanner from '../components/desktop/ResourcesBanner';
import ResourcesGrid from '../components/ResourcesGrid';
import ResourcesBannerMobile from '../components/mobile/ResourcesBannerMobile';

function SavedResources(props) {
  const [loading, setLoading] = useState(false);

  const [resources, setResources] = useState([]);
  const [savedSet, setSavedSet] = useState(new Set());

  const isMobile = useWindowDimensions()[1];
  const { authed } = props;

  const updateSaved = useCallback(async () => {
    setLoading(true);

    const newResources = await getResources();

    let localSavedSet = new Set();
    if (authed) {
      const json = await getSavedResources();
      localSavedSet = new Set(json.result);
      setSavedSet(localSavedSet);
    }

    newResources.result = newResources.result.filter(newResource =>
      localSavedSet.has(newResource._id),
    );

    newResources.result.sort((current, next) => {
      const textCurrent = current.name.toUpperCase();
      const textNext = next.name.toUpperCase();
      const bool = textCurrent > textNext ? 1 : 0;
      return textCurrent < textNext ? -1 : bool;
    });

    setResources(newResources == null ? [] : newResources.result);
    setLoading(false);
  }, [authed]);

  useEffect(() => {
    updateSaved();
  }, [authed, updateSaved]);

  if (authed === false) {
    return <Redirect to="/resources" />;
  }

  return (
    <Layout className="resources">
      {isMobile ? (
        <ResourcesBannerMobile categorySelected="Saved Resources" />
      ) : (
        <ResourcesBanner categorySelected="Saved Resources" />
      )}
      <Layout style={{ background: 'white' }}>
        {loading ? (
          <Loader
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            type="Circles"
            color="#6A3E9E"
            height={100}
            width={100}
          />
        ) : (
          <ResourcesGrid
            filteredResources={resources}
            savedResources={savedSet}
            authed={authed}
            updateSaved={updateSaved}
          />
        )}
      </Layout>
    </Layout>
  );
}

SavedResources.defaultProps = {
  location: { search: '' },
  history: { pathname: '', search: '' },
  authed: false,
};

SavedResources.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string }),
  history: PropTypes.shape({
    pathname: PropTypes.string,
    push: PropTypes.func,
    search: PropTypes.string,
  }),
  authed: PropTypes.bool,
};

export default SavedResources;
