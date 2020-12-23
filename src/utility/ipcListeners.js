import store from './createStore';
const { ipcRenderer } = window.require('electron');

export default function registerIPCListners() {
  // Listen from backend calls
  ipcRenderer.on('addProjectMain', (e, input) => {
    console.log('incomming from second window');
    console.log(input);
    store.dispatch({ type: 'addProjectMain', payload: input });
  });

  // Listen from backend calls
  ipcRenderer.on('menuAddSnippet', (e, input) => {
    console.log('incomming from main process');
    console.log(input);
    // store.dispatch({type: 'addProjectMain', payload: input})
  });
}
