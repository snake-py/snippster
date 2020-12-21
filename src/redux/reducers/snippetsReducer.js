export function snippetReducer(state = {}, action) {
  console.log(action);
  switch (action.type) {
    case 'INITIAL':
      return {
        ...state,
        snippets: [...action.payload],
        activeSnippet: action.payload.filter((snippet) => snippet.active === true)[0],
        queriedSnippets: [],
      };
    case 'ACTIVATE':
      return {
        ...state,
        snippets: state.snippets.map((snippet) => (action.payload.id === snippet.id ? { ...snippet, active: true } : { ...snippet, active: false })),
        activeSnippet: { ...action.payload, active: true },
      };
    case 'ACTIVATE_IN_QUERIED_STATE':
      return {
        ...state,
        queriedSnippets: state.queriedSnippets.map((snippet) => (action.payload.id === snippet.id ? { ...snippet, active: true } : { ...snippet, active: false })),
        activeSnippet: { ...action.payload, active: true },
      };
    case 'UPDATE':
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
    case 'ADD_SNIPPET':
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
      let index = 0;
      for (let i = 0; i < state.snippets.length; i++) {
        const snip = state.snippets[i];
        if (snip.id === action.payload.id) {
          console.log(i);
          index = i;
        }
      }
      const filtered = state.snippets.filter((snippet) => {
        if (action.payload.id !== snippet.id) {
          return { ...snippet };
        }
      });
      return {
        ...state,
        activeSnippet: { ...state.snippets[index - 1], active: true },
        snippets: [
          ...filtered.map((snippet) => {
            if (action.payload.id !== snippet.id && state.snippets[index - 1].id === snippet.id) {
              return { ...snippet, active: true };
            } else if (action.payload.id !== snippet.id) {
              return { ...snippet };
            }
          }),
        ],
      };
    case 'QUERY_SNIPPET_IN_PROJECT':
      return {
        ...state,
        activeSnippet: { ...action.payload.filter((snippet) => snippet.actie === true)[0] },
        snippets: [...action.payload],
        queriedSnippets: [...action.payload],
      };
    case 'QUERY_SNIPPET_GLOBAL':
      return {
        ...state,
        activeSnippet: { ...action.payload.filter((snippet) => snippet.active === true)[0] },
        queriedSnippets: [...action.payload],
      };
    case 'SWITCH_PROJECT_SNIPPETS':
      return {
        ...state,
        snippets: [...action.payload],
        activeSnippet: action.payload.filter((snippet) => snippet.active === true)[0],
      };
    case 'DEACTIVATE_CURRENT_ACTIVE_SNIPPET':
      return {
        ...state,
        snippets: [...state.snippets.map((snippet) => ({ ...snippet, active: false }))],
        activeSnippet: false,
      };
    case 'REMOVE_QUERIED_SNIPPET':
      console.log(state);
      return {
        ...state,
        queriedSnippets: '',
        'snippets': ''
      };
    default:
      return state;
  }
}
