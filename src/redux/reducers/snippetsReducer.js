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
      console.log(action);
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
        console.log(snippet.id);
        console.log(state.snippets[index - 1].id);
        if (action.payload.id !== snippet.id) {
          return { ...snippet };
        }
      });
      console.log(index);
      console.log(state.snippets[index - 1]);
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
    default:
      return state;
  }
}
