const { ipcRenderer } = window.require('electron');

// let initialState = {}
// function setSnippetInitialState(snippetsMap) {
//   initialState = snippetsMap;
// }

// async function initializeState() {
//   await ipcRenderer.invoke('getSnippets').then((res) => {
//     const snippetsMap = res.snippets.map((snippet, index) => {
//       return index === 0 ? { ...snippet, active: true } : { ...snippet, active: false };
//     });
//     console.log(snippetsMap);
//     setSnippetInitialState(snippetsMap);
//   });
// }

// initializeState()


export function snippetReducer(state = {}, action) {
  switch (action.type) {
    case "INITIAL": 
      // console.log(...action.payload);
      return state = [...action.payload];
    default:
      return state;
  }
}





// case 'INITIAL':
    //   return { ...state, snippets: [...state.snippets, ...action.snippets] };
