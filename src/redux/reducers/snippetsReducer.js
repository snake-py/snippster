export function snippetReducer(state = {}, action) {
  switch (action.type) {
    case 'INITIAL':
      return { ...state, snippets: [...action.payload] };
    case 'ACTIVATE':

      return {
        ...state,
        snippets: state.snippets.map((snippet) => (action.payload.id === snippet.id ? {...snippet, active: true} : {...snippet, active: false})),
      };
    default:
      return state;
  }
}
