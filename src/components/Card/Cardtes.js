import { render, screen } from '@testing-library/react';
import Card from './Card';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('With React Testing Library', () => {
  const initialState = {
    app: {

      query: '',
      queriedView: false,
      ready: true,
    snippets: {
        
    }
    },
  };
  const mockStore = configureStore();
  let store;

  it('Shows "Hello world!"', () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Card />
      </Provider>
    );
  });
});
