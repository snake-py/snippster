import React, { useEffect } from 'react';
import SnippetCodeEditor from '../MainWindow/SnippetCodeEditor';
import SnippetResults from '../MainWindow/SnippetResults';
import SnippetView from '../MainWindow/SnippetView';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialSnippets } from '../../redux/actions/snippetsActions.js';
import '../../static/scss/_mainWindow.scss';
import Resizer from '../utilities/Resizer';

export default function MainWindow() {
  const logging = useSelector((state) => console.log(state));
  const snippets = useSelector((state) => state.snippets);
  const activeSnippet = useSelector((state) => state.snippets.activeSnippet);
  const dispatch = useDispatch();

  // console.log(snippets.snippets);
  console.log(activeSnippet);
  useEffect(() => {
    console.log('useEffectCalled');
    dispatch(setInitialSnippets());
  }, []);

  return (
    <div className="main-window-wrapper">
      {snippets.snippets ? <SnippetResults snippets={snippets.snippets} /> : ''}
      <Resizer />
      {snippets.snippets ? <SnippetView snippet={activeSnippet} /> : ''}
      <Resizer />
      <SnippetCodeEditor snippet={activeSnippet} />
    </div>
  );
}
