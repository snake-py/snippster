import React, { useState, useEffect, useRef } from 'react';
import SnippetCodeEditor from './SnippetCodeEditor';
import SnippetResults from './SnippetResults';
import SnippetView from './SnippetView';
import { useSelector } from 'react-redux';
// import Split from 'react-split'
import ResizePanel from 'react-resize-panel';

export default function MainWindow() {
  const snippets = useSelector((state) => state.snippets);
  const appState = useSelector((state) => state.app);
  const activeSnippet = useSelector((state) => state.snippets.activeSnippet);

  return (
    <div className="main-window-wrapper">

      <SnippetResults snippets={appState.queriedView ? snippets.queriedSnippets : snippets.snippets} />

      {activeSnippet ? <SnippetView snippet={activeSnippet} /> : <></>}
      {activeSnippet ? <SnippetCodeEditor snippet={activeSnippet} /> : <></>}
    </div>
  );
}
