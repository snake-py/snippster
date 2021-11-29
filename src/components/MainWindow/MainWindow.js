import React from 'react';
import SnippetCodeEditor from './SnippetCodeEditor';
import SnippetResults from './SnippetResults';
import SnippetView from './SnippetView';
import { useSelector } from 'react-redux';
import PanelGroup from 'react-panelgroup';

export default function MainWindow() {
  const snippets = useSelector((state) => state.snippets);
  const activeSnippet = useSelector((state) => state.snippets.activeSnippet);

  return (
    <PanelGroup direction="row" borderColor="grey">
      <SnippetResults snippets={snippets.snippets} />
      {activeSnippet ? <SnippetView snippet={activeSnippet} /> : <></>}
      {activeSnippet ? <SnippetCodeEditor snippet={activeSnippet} /> : <></>}
    </PanelGroup>
  );
}
