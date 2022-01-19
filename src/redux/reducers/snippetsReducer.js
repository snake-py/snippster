import {
  snippetsReducerInitialSnippets,
  snippetsReducerActivate,
  snippetsReducerActivateSnippetQueriedState,
  snippetsReducerUpdate,
  snippetsReducerEditTitle,
  snippetsReducerEditCode,
  snippetsReducerEditDescription,
  snippetsReducerAddSnippet,
  snippetsReducerDeleteSnippet,
  snippetsReducerQueryProject,
  snippetsReducerProjectSwitch,
  snippetsReducerQueryGlobal,
  openSnippsterMarket,
} from './../_actions';

export function snippetReducer(state = {}, action) {
  console.log(action);
  switch (action.type) {
    case snippetsReducerInitialSnippets:
      return {
        ...state,
        snippets: [...action.payload],
        activeSnippet: action.payload.filter((snippet) => snippet.active === true)[0],
      };
    case openSnippsterMarket:
        return {
          ...state,
          snippets: [],
          snippets: {}, // bug??
        };
    case snippetsReducerActivate:
      return {
        ...state,
        snippets: state.snippets.map((snippet) => (action.payload.id === snippet.id ? { ...snippet, active: true } : { ...snippet, active: false })),
        activeSnippet: { ...action.payload, active: true },
      };
    case snippetsReducerActivateSnippetQueriedState:
      return {
        ...state,
        queriedSnippets: state.queriedSnippets.map((snippet) => (action.payload.id === snippet.id ? { ...snippet, active: true } : { ...snippet, active: false })),
        activeSnippet: { ...action.payload, active: true },
      };
    case snippetsReducerUpdate:
      return {
        ...state,
        snippets: state.snippets.map((snippet) =>
          action.payload.id === snippet.id ? { ...snippet, title: action.payload.title, description: action.payload.description, active: true, isSaved: true } : { ...snippet, active: false }
        ),
        activeSnippet: { ...action.payload, active: true, isSaved: true },
      };

    case snippetsReducerEditTitle:
      return {
        ...state,
        snippets: state.snippets.map((snippet) =>
          action.payload.snippet.id === snippet.id ? { ...snippet, title: action.payload.title, active: true, isSaved: false } : { ...snippet, active: false }
        ),
        activeSnippet: { ...action.payload.snippet, title: action.payload.title, active: true, isSaved: false },
      };

    case snippetsReducerEditDescription:
      return {
        ...state,
        snippets: state.snippets.map((snippet) =>
          action.payload.snippet.id === snippet.id ? { ...snippet, description: action.payload.description, active: true, isSaved: false } : { ...snippet, active: false }
        ),
        activeSnippet: { ...action.payload.snippet, description: action.payload.description, active: true, isSaved: false },
      };
    case snippetsReducerEditCode:
      return {
        ...state,
        snippets: state.snippets.map((snippet) => (action.payload.snippet.id === snippet.id ? { ...snippet, code: action.payload.code, active: true, isSaved: false } : { ...snippet, active: false })),
        activeSnippet: { ...action.payload.snippet, code: action.payload.code, active: true, isSaved: false },
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
    case snippetsReducerAddSnippet:
      return {
        ...state,
        snippets: [...state.snippets.map((snippet) => ({ ...snippet, active: false })), { ...action.payload }],
        activeSnippet: { ...action.payload },
      };
    case snippetsReducerDeleteSnippet:
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
    case snippetsReducerProjectSwitch:
      return {
        ...state,
        snippets: [...action.payload],
        activeSnippet: action.payload.filter((snippet) => snippet.active === true)[0],
      };
    case snippetsReducerQueryProject:
      return {
        ...state,
        activeSnippet: { ...action.payload.filter((snippet) => snippet.active === true)[0] },
        snippets: [...action.payload],
        // queriedSnippets: [...action.payload],
      };
    case snippetsReducerQueryGlobal:
      return {
        ...state,
        activeSnippet: { ...action.payload.filter((snippet) => snippet.active === true)[0] },
        snippets: [...action.payload],
      };

    case 'REMOVE_QUERIED_SNIPPET':
      console.log(state);
      return {
        ...state,
        snippets: [],
        activeSnippet: false,
      };
      case 'QUERY_RETURNED_NULL':
        console.log(state);
        return {
          ...state,
          snippets: [],
          activeSnippet: false,
        };
    default:
      return state;
  }
}
