import { combineReducers } from 'redux';
import { snippetReducer } from './snippetsReducer';
import { appReducer } from './appReducer';
const { ipcRenderer } = window.require('electron');

const reducers = combineReducers({
  app: appReducer,
  snippets: snippetReducer,
});

export default reducers;
