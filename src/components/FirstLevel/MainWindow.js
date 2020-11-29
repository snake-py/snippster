import React from 'react';
import SnippetCodeEditor from '../MainWindow/SnippetCodeEditor';
import SnippetResults from '../MainWindow/SnippetResults';
import SnippetView from '../MainWindow/SnippetView';
import { useSelector } from 'react-redux';
import '../../static/scss/_mainWindow.scss';
import Resizer from '../utilities/Resizer';

export default function MainWindow() {
  const snippets = useSelector((state) => state.snippets);
  const activeSnippet = useSelector((state) => state.snippets.activeSnippet);

  return (
    <div className="main-window-wrapper">
      <SnippetResults snippets={snippets.snippets} />
      <Resizer />
      {activeSnippet ? <SnippetView snippet={activeSnippet} /> : ''}
      <Resizer />
      <SnippetCodeEditor snippet={activeSnippet} />
    </div>
  );
}
