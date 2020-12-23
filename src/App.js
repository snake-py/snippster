import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import Actions
import { setInitialSnippets } from './redux/actions/snippetsActions.js';
import { getProjects, makeAppReady, getLanguages } from './redux/actions/appActions.js';

// Import components
import LoadedApp from './components/AppTypes/LoadedApp';

function App() {
  const appState = useSelector((state) => state.app);

  return (
    <>
      <div className="App">{appState.ready ? <LoadedApp /> : ''}</div>
    </>
  );
}

export default App;
