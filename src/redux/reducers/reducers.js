import { combineReducers } from 'redux';
import { snippetReducer } from './snippetsReducer';
import { appReducer } from './appReducer';

const reducers = combineReducers({
  app: appReducer,
  snippets: snippetReducer,
});

export default reducers;
