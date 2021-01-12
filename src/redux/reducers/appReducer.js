import { appReducerAppReady, appReducerGetLang, appReducerInitialProjects, appReducerSwitchProject, appReducerQuerySnippet, appReducerOpenQueryView } from './../_actions';

export function appReducer(state = { ready: false }, action) {
  console.log(action);
  switch (action.type) {
    case appReducerAppReady:
      return {
        ...state,
        query: '',
        queriedView: false,
        ready: true,
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

    case appReducerInitialProjects:
      return {
        ...state,
        projects: [...action.payload],
        activeProject: action.payload.filter((project) => project.active === true)[0],
      };

    case appReducerSwitchProject:
      console.log(state.projects);
      return {
        ...state,
        queriedView: false,
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

    default:
      return state;
  }
}
