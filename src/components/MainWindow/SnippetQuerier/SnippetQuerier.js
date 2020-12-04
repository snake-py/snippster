import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { querySnippet } from '../../../redux/actions/appActions';

export default function SnippetQuerier() {
  const [searchTerm, setSearchTerm] = useState('');
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm != '') {
        dispatch(querySnippet(searchTerm, appState.activeProject));
      }
    }, 3000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <>
      <input
        //   onChange={(e) => dispatch(querySnippet(e.target.value))}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        placeholder="Search for Snippet"
        className="snippet-query-input"
        type="text"
      />
    </>
  );
}
