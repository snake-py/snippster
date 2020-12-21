import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import {correctState, testStore} from '../test/react/state'

describe('With React Testing Library', () => {

  it('Renders the app"', () => {

    render(
      <Provider store={testStore}>
        <App />
      </Provider>
    );
  });
});
