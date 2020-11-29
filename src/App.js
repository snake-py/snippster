import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import Actions
import { setInitialSnippets } from './redux/actions/snippetsActions.js';
import { getProjects, makeAppReady, getLanguages } from './redux/actions/appActions.js';

// Import components
import LoadedApp from './components/LoadedApp'


function App() {
  const appState = useSelector((state) => state.app);
  const snippets = useSelector((state) => state.snippets);
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('App pulls all data');
    dispatch(getLanguages());
    dispatch(getProjects());
    dispatch(setInitialSnippets());
    dispatch(makeAppReady())
  }, [dispatch]);
  console.log(appState);
  console.log(snippets);
  return (
    <div className="App">
      {appState.ready ? <LoadedApp /> : ''}
    </div>
  );
}

export default App;
