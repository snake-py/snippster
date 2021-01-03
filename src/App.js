import React from 'react';
import { useSelector } from 'react-redux';

// Import components
import LoadedApp from './components/AppTypes/LoadedApp';

function App() {
  const appState = useSelector((state) => state.app);
  console.log(appState);

  return (
    <>
      <div className="App">{appState.ready ? <LoadedApp /> : ''}</div>
    </>
  );
}

export default App;
