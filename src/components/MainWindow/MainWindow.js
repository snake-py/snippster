import React from 'react';
import SnippetCodeEditor from './SnippetCodeEditor';
import SnippetResults from './SnippetResults';
import SnippetView from './SnippetView';
import { useSelector } from 'react-redux';
import PanelGroup from 'react-panelgroup';
import SnippetMarket from '../SnippetMarket';
export default function MainWindow() {
  const snippets = useSelector((state) => state.snippets);
  const activeSnippet = useSelector((state) => state.snippets.activeSnippet);
  const appState = useSelector((state) => state.app);
  
  return (
    appState.openSnippsterMarket ? <SnippetMarket /> :
    <PanelGroup direction="row" borderColor="grey">
      <SnippetResults snippets={snippets.snippets} />
      {activeSnippet ? <SnippetView snippet={activeSnippet} /> : <></>}
      {activeSnippet ? <SnippetCodeEditor snippet={activeSnippet} /> : <></>}
    </PanelGroup>
  );
}
