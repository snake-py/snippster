import { combineReducers } from 'redux';
import { snippetReducer } from './snippetsReducer';
const { ipcRenderer } = window.require('electron');

const reducers = combineReducers({
  snippets: snippetReducer,
});

export default reducers;
