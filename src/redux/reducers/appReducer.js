export function appReducer(state = { ready: false }, action) {
  console.log(action);
  switch (action.type) {
    case 'APP_READY':
      return {
        ...state,
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

    default:
      return state;
  }
}
