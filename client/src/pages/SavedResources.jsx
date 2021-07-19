import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import '../css/Resources.css';
import Loader from 'react-loader-spinner';
import { Redirect } from 'react-router-dom';

import { getResources } from '../utils/api';
import { getSavedResources } from '../utils/auth';
import ResourcesBanner from '../components/ResourcesBanner';
import ResourcesGrid from '../components/ResourcesGrid';
import { useAuth } from '../utils/use-auth';

function SavedResources() {
  const [loading, setLoading] = useState(false);

  const [resources, setResources] = useState([]);
  const [savedSet, setSavedSet] = useState(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const { authed } = useAuth();

  const updateSaved = useCallback(async () => {
    setLoading(true);

    const newResources = await getResources();

    let localSavedSet = new Set();
    if (authed) {
      const json = await getSavedResources();
      localSavedSet = new Set(json.result);
      setSavedSet(localSavedSet);
    }

    newResources.result = newResources.result.totalData.filter((newResource) =>
      localSavedSet.has(newResource._id),
    );

    newResources.result.sort((current, next) => {
      const textCurrent = current.name.toUpperCase();
      const textNext = next.name.toUpperCase();
      const bool = textCurrent > textNext ? 1 : 0;
      return textCurrent < textNext ? -1 : bool;
    });

    setResources(
      newResources !== null && newResources !== undefined
        ? newResources.result
        : [],
    );
    setLoading(false);
  }, [authed]);

  useEffect(() => {
    updateSaved();
  }, [authed, updateSaved]);

  const updatePagination = useCallback((pageNumber, pageItems) => {
    setPage(parseInt(pageNumber, 10));
    setPageSize(parseInt(pageItems, 10));
  }, []);

  if (!authed) {
    return <Redirect to="/resources" />;
  }

  return (
    <Layout className="resources">
      <ResourcesBanner categorySelected={{ name: 'Saved Resources' }} />
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
            updateSaved={updateSaved}
            resourceCount={resources.length}
            updatePagination={updatePagination}
            pageSize={pageSize}
            page={page}
          />
        )}
      </Layout>
    </Layout>
  );
}

SavedResources.defaultProps = {
  location: { search: '' },
  history: { pathname: '', search: '' },
};

SavedResources.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string }),
  history: PropTypes.shape({
    pathname: PropTypes.string,
    push: PropTypes.func,
    search: PropTypes.string,
  }),
};

export default SavedResources;
