import React, { useEffect } from 'react';
import Card from '../utilities/Card';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialSnippets } from '../../redux/actions/snippetsActions.js';
const { ipcRenderer } = window.require('electron');

export default function SnippetResults() {
  const snippets = useSelector((state) => state.snippets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialSnippets());
  }, []);


  return (
    <div className="window">
      {snippets[1] ? snippets.map((snippet) => <Card snippet={snippet} key={snippet.id} />) : 'No Snippets are currently found'}
    </div>
  );
}
