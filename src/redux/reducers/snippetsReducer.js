export function snippetReducer(state = {}, action) {
  switch (action.type) {
    case 'INITIAL':
      // console.log(action.payload)
      // console.log(action.payload.filter(snippet => snippet.active === true))
      return {
        ...state,
        snippets: [...action.payload],
        activeSnippet: action.payload.filter((snippet) => snippet.active === true)[0],
      };
    case 'ACTIVATE':
      return {
        ...state,
        snippets: state.snippets.map((snippet) => (action.payload.id === snippet.id ? { ...snippet, active: true } : { ...snippet, active: false })),
        activeSnippet: { ...action.payload, active: true },
      };
    case 'UPDATE':
      console.log(action);
      return {
        ...state,
        snippets: state.snippets.map((snippet) =>
          action.payload.id === snippet.id ? { ...snippet, title: action.payload.title, description: action.payload.description, active: true, isSaved: true } : { ...snippet, active: false }
        ),
        activeSnippet: { ...action.payload, active: true, isSaved: true },
      };
    case 'EDIT_TITLE':
      console.log(action);
      return {
        ...state,
        snippets: state.snippets.map((snippet) =>
          action.payload.snippet.id === snippet.id ? { ...snippet, title: action.payload.title, active: true, isSaved: false } : { ...snippet, active: false }
        ),
        activeSnippet: { ...action.payload.snippet, title: action.payload.title, active: true, isSaved: false },
      };
    case 'EDIT_DESCRIPTION':
      console.log(action);
      return {
        ...state,
        snippets: state.snippets.map((snippet) =>
          action.payload.snippet.id === snippet.id ? { ...snippet, description: action.payload.description, active: true, isSaved: false } : { ...snippet, active: false }
        ),
        activeSnippet: { ...action.payload.snippet, description: action.payload.description, active: true, isSaved: false },
      };
    case 'EDIT_CODE':
      console.log(action);
      return {
        ...state,
        snippets: state.snippets.map((snippet) => (action.payload.snippet.id === snippet.id ? { ...snippet, code: action.payload.code, active: true, isSaved: false } : { ...snippet, active: false })),
        activeSnippet: { ...action.payload.snippet, code: action.payload.code, active: true, isSaved: false },
      };
    case 'ADD':
      console.log(action);
      return {
        ...state,
        snippets: [...state.snippets.map((snippet) => ({ ...snippet, active: false })), {...action.payload}],
        activeSnippet: {...action.payload},
      };
    default:
      return state;
  }
}
