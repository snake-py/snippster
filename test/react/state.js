import { applyMiddleware, createStore } from 'redux';
import reducers from '../../src/redux/reducers/reducers';
import { middlewares } from '../../src/createStore';

// Correct state on fire up
export const correctState = {
  activeSnippet: { id: 1, project_id: 1, title: 'React with Redux', description: 'Redux Set up', code: "function(){return 'hi'}" },
  queriedSnippets: [],
  snippets: [
    {
      id: 1,
      project_id: 1,
      title: 'React with Redux',
      description: 'Redux Set up',
      code: "function(){return 'hi'}",
      active: true,
      framework: null,
      frameworkIcon: null,
      framework_id: null,
      isSaved: true,
      language: 'JavaScript',
      languageIcon: 'icons/languages/js.svg',
      language_id: 1,
      language_short: 'javascript',
    },
    {
      id: 1,
      project_id: 1,
      title: 'React with Redux',
      description: 'Redux Set up',
      code: "function(){return 'hi'}",
      active: false,
      framework: 'Vue',
      frameworkIcon: 'icons/frameworks/vue.svg',
      framework_id: 3,
      isSaved: true,
      language: 'JavaScript',
      languageIcon: 'icons/languages/js.svg',
      language_id: 1,
      language_short: 'javascript',
    },
  ],
  languages: [
    {
      framework: [
        { id: 1, framework: 'React', language_id: 1, frameworkIcon: 'icons/frameworks/react.svg' },
        { id: 2, framework: 'Angular', language_id: 1, frameworkIcon: 'icons/frameworks/angular.svg' },
        { id: 3, framework: 'Vue', language_id: 1, frameworkIcon: 'icons/frameworks/vue.svg' },
      ],
      id: 1,
      language: 'JavaScript',
      languageIcon: 'icons/languages/js.svg',
      language_short: 'javascript',
    },
    {
      framework: [
        { id: 7, framework: 'Flask', language_id: 2, frameworkIcon: 'icons/frameworks/flask.svg' },
        { id: 8, framework: 'Django', language_id: 2, frameworkIcon: 'icons/frameworks/django.svg' },
        { id: 9, framework: 'FAST API', language_id: 2, frameworkIcon: 'icons/frameworks/FastApi.svg' },
      ],
      id: 2,
      language: 'Python',
      languageIcon: 'icons/languages/python.svg',
      language_short: 'python',
    },
  ],
  queriedView: false,
  query: '',
  ready: true,
};


export  const testStore = createStore(reducers, correctState, applyMiddleware(...middlewares));
