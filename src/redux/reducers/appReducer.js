export function appReducer(state = { ready: false }, action) {
  console.log(action);
  switch (action.type) {
    case 'APP_READY':
      return {
        ...state,
        query: '',
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
        activeProject: {...action.payload},
        projects:  [...state.projects.map((project) => (project.id === action.payload.id ? { ...project, active: true } : { ...project, active: false }))],
      };
      case 'QUERY_SNIPPET':
        console.log(state.projects);
        return {
          ...state,
          query: action.payload
        };
    default:
      return state;
  }
}
