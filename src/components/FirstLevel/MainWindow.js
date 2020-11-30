import React, { useState, useEffect, useRef } from 'react';
import SnippetCodeEditor from '../MainWindow/SnippetCodeEditor';
import SnippetResults from '../MainWindow/SnippetResults';
import SnippetView from '../MainWindow/SnippetView';
import { useSelector } from 'react-redux';
import ResizePanel from 'react-resize-panel';
import '../../static/scss/_mainWindow.scss';

export default function MainWindow() {
  const snippets = useSelector((state) => state.snippets);
  const activeSnippet = useSelector((state) => state.snippets.activeSnippet);

  return (
    <div className="main-window-wrapper">
      <ResizePanel direction="e">
        <SnippetResults snippets={snippets.snippets} />
      </ResizePanel>

        {activeSnippet ? <SnippetView snippet={activeSnippet} /> : ''}

      <ResizePanel direction="w">
        <SnippetCodeEditor snippet={activeSnippet} />
      </ResizePanel>
    </div>
  );
}
