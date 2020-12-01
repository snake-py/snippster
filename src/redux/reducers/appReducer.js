export function appReducer(state = { ready: false }, action) {
  console.log(action);
  switch (action.type) {
    case 'APP_READY':
      return {
        ...state,
        query: '',
        queriedView: false,
        ready: true,
      };
    case 'GET_LANGUAGES':
      return {
        ...state,
        languages: [...action.payload],
      };

    case 'INITIAL_PROJECTS':
      return {
        ...state,
        projects: [...action.payload],
        activeProject: action.payload.filter((project) => project.active === true)[0],
      };

    case 'SWITCH_PROJECT':
      console.log(state.projects);
      return {
        ...state,
        queriedView: false,
        activeProject: { ...action.payload },
        projects: [...state.projects.map((project) => (project.id === action.payload.id ? { ...project, active: true } : { ...project, active: false }))],
      };
    case 'QUERY_SNIPPET':
      return {
        ...state,
        query: action.payload,
      };
    case 'OPEN_QUERY_VIEW':
      return {
        ...state,
        activeProject: {},
        projects: [...state.projects.map((project) => ({ ...project, active: false }))],
        queriedView: true,
      };
    default:
      return state;
  }
}
