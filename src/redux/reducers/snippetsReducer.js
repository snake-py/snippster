export function snippetReducer(state = {}, action) {
  switch (action.type) {
    case 'INITIAL':
      console.log(action);

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
      return {
        ...state,
        snippets: state.snippets.map((snippet) =>
          action.payload.snippet.id === snippet.id ? { ...snippet, title: action.payload.title, active: true, isSaved: false } : { ...snippet, active: false }
        ),
        activeSnippet: { ...action.payload.snippet, title: action.payload.title, active: true, isSaved: false },
      };
    case 'EDIT_DESCRIPTION':
      return {
        ...state,
        snippets: state.snippets.map((snippet) =>
          action.payload.snippet.id === snippet.id ? { ...snippet, description: action.payload.description, active: true, isSaved: false } : { ...snippet, active: false }
        ),
        activeSnippet: { ...action.payload.snippet, description: action.payload.description, active: true, isSaved: false },
      };
    case 'EDIT_CODE':
      return {
        ...state,
        snippets: state.snippets.map((snippet) => (action.payload.snippet.id === snippet.id ? { ...snippet, code: action.payload.code, active: true, isSaved: false } : { ...snippet, active: false })),
        activeSnippet: { ...action.payload.snippet, code: action.payload.code, active: true, isSaved: false },
      };
    case 'ADD':
      return {
        ...state,
        snippets: [...state.snippets.map((snippet) => ({ ...snippet, active: false })), { ...action.payload }],
        activeSnippet: { ...action.payload },
      };
    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        activeSnippet: { ...action.payload },
        snippets: [
          ...state.snippets.map((snippet) => {
            if (action.payload.id === snippet.id) {
              return { ...action.payload };
            } else {
              return { ...snippet };
            }
          }),
        ],
      };
    case 'UPDATE_FRAMEWORK':
      return {
        ...state,
        activeSnippet: { ...action.payload },
        snippets: [
          ...state.snippets.map((snippet) => {
            if (action.payload.id === snippet.id) {
              return { ...action.payload };
            } else {
              return { ...snippet };
            }
          }),
        ],
      };
    case 'DELETE_SNIPPET':
      console.log(action);
      return {
        ...state,
        activeSnippet: { ...action.payload.snippets.filter((snip) => snip.id + 1 === action.payload.snippet)[0] },
        snippets: [
          ...state.snippets.filter((snippet) => {
            if (action.payload.snippet.id !== snippet.id) {
              return { ...snippet };
            }
          }),
        ],
      };
    default:
      return state;
  }
}
