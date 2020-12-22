import store from './createStore'
const { ipcRenderer } = window.require('electron');

// Listen from backend calls
ipcRenderer.on('addProjectMain', (e, input) => {
    console.log('incomming from second window');
    console.log(input);
    store.dispatch({type: 'addProjectMain', payload: input})
})