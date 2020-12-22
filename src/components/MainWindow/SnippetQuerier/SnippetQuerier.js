import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { querySnippet, resetQuery, globalQuery } from '../../../redux/actions/appActions';

export default function SnippetQuerier() {
  const [searchTerm, setSearchTerm] = useState('');
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm === '' && appState.query !== '') {
        dispatch(resetQuery(appState.activeProject));
      } else if (searchTerm !== '' && appState.query !== searchTerm && appState.queriedView === false) {
        dispatch(querySnippet(searchTerm, appState.activeProject));
      } else if (searchTerm !== '' && appState.query !== searchTerm && appState.queriedView === true) {
        dispatch(globalQuery(searchTerm));
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <>
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        placeholder="Search for Snippet"
        className="snippet-query-input"
        type="text"
      />
    </>
  );
}
