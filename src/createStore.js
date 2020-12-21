import { createStore, applyMiddleware  } from 'redux';
import reducers from './redux/reducers/reducers';
import thunk from 'redux-thunk';

export const middlewares = [thunk]

const store = createStore(reducers, applyMiddleware(...middlewares));

export default store