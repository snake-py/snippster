export function snippetReducer(state = {}, action) {
  switch (action.type) {
    case 'INITIAL':
      // console.log(action.payload)
      // console.log(action.payload.filter(snippet => snippet.active === true))
      return {
        ...state,
        snippets: [...action.payload],
        activeSnippet: action.payload.filter(snippet => snippet.active === true)[0]
      };
    case 'ACTIVATE':
      return {
        ...state,
        snippets: state.snippets.map((snippet) => (action.payload.id === snippet.id ? { ...snippet, active: true } : { ...snippet, active: false })),
        activeSnippet: {...action.payload, active: true},
      };
    default:
      return state;
  }
}
