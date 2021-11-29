import { appReducerAppReady, appReducerGetLang, appReducerInitialProjects, appReducerSwitchProject, appReducerQuerySnippet, appReducerOpenQueryView, openSnippsterMarket } from './../_actions';

export function appReducer(state = { ready: false }, action) {
  switch (action.type) {
    case appReducerAppReady:
      return {
        ...state,
        query: '',
        queriedView: false,
        ready: true,
        openSnippsterMarket: false,
      };
    case 'SET_IS_DEV':
      return {
        ...state,
        isDev: action.payload.isDev,
        userData: action.payload.userData,
      };
    case appReducerGetLang:
      console.log(`reducer gets projects ${action}`);
      console.log(state);
      return {
        ...state,
        languages: [...action.payload],
      };
    case openSnippsterMarket:
      return {
        ...state,
        queriedView: false,
        openSnippsterMarket: true,
      };
    case appReducerInitialProjects:
      return {
        ...state,
        projects: [...action.payload],
        activeProject: { ...action.payload[0], active: true },
      };

    case appReducerSwitchProject:
      console.log(state.projects);
      return {
        ...state,
        queriedView: false,
        openSnippsterMarket: false,
        activeProject: { ...action.payload },
        projects: [...state.projects.map((project) => (project.id === action.payload.id ? { ...project, active: true } : { ...project, active: false }))],
      };
    case appReducerQuerySnippet:
      return {
        ...state,
        query: action.payload,
      };
    case appReducerOpenQueryView:
      return {
        ...state,
        activeProject: {},
        openSnippsterMarket: false,
        projects: [...state.projects.map((project) => ({ ...project, active: false }))],
        queriedView: true,
      };
    case 'RESET_QUERY':
      console.log(state);
      return {
        ...state,
        query: '',
      };
    case 'addProjectMain':
      return {
        ...state,
        projects: [...state.projects.map((project) => ({ ...project, active: false })), { ...action.payload, active: true }],
        activeProject: { ...action.payload, active: true },
      };
    case 'GET_VERSION':
      return {
        ...state,
        version: action.payload,
      };

    default:
      return state;
  }
}
