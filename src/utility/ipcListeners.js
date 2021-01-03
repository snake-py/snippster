import store from './createStore';
import { addSnippet, saveSnippet, deleteSnippet } from './../redux/actions/snippetsActions';
import { openQueryViewOnClick, deleteProject, switchProject } from '../redux/actions/appActions';
const { ipcRenderer } = window.require('electron');

export default function registerIPCListners() {
  // Listen from backend calls

  //project
  // add
  ipcRenderer.on('addProjectMain', (e, input) => {
    store.dispatch({ type: 'addProjectMain', payload: input });
    store.dispatch(switchProject(input));
  });
  
  //delete
  ipcRenderer.on('menuDeleteProject', (e) => {
    store.dispatch(deleteProject());
  });

  // File
  //Snippets
  // 'ctrl+shift+a'
  ipcRenderer.on('menuAddSnippet', (e) => {
    store.dispatch(addSnippet());
  });
  // 'ctrl+s'
  ipcRenderer.on('menuSaveSnippet', (e) => {
    store.dispatch(saveSnippet());
  });
  // none
  ipcRenderer.on('menuDeleteSnippet', (e) => {
    store.dispatch(deleteSnippet());
  });

  // Navigation
  // Query
  // 'ctrl+q'
  ipcRenderer.on('menuQueryProject', (e) => {
    document.querySelector('.snippet-query-input').focus();
  });
  // 'ctrl+shift+q'
  ipcRenderer.on('menuQueryGlobal', (e) => {
    store.dispatch(openQueryViewOnClick());
    document.querySelector('.snippet-query-input').focus();
  });
}
