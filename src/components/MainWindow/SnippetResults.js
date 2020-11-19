import React, { useEffect } from 'react';
import Card from '../utilities/Card';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialSnippets } from '../../redux/actions/snippetsActions.js';
const { ipcRenderer } = window.require('electron');

export default function SnippetResults() {
  const snippets = useSelector((state) => state.snippets);
  const dispatch = useDispatch();
  console.log(snippets);
  if (snippets.snippets) {
    console.log(snippets.snippets);
  }
  useEffect(() => {
    console.log('useEffectCalled');
    dispatch(setInitialSnippets());
  }, []);


  return (
    <div className="window">
      {snippets.snippets ? snippets.snippets.map((snippet) => <Card snippet={snippet} key={snippet.id} />) : 'No Snippets are currently found'}
    </div>
  );
}
