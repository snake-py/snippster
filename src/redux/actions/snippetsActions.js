const { ipcRenderer } = window.require('electron');

export const activateSnippet = (snippet) => {
  console.log('activate');
  console.log(snippet);
  return {
    type: 'ACTIVATE',
    payload: snippet,
  };
};

export const editSnippet = (snippet, title) => (dispatch) => {
  dispatch({ type: 'EDIT', payload: { snippet: snippet, title: title } });
};

export const setInitialSnippets = () => (dispatch) => {
  ipcRenderer.invoke('getSnippets').then((res) => {
    const initialSnippets = res.snippets.map((snippet, index) => {
      return index === 0 ? { ...snippet, active: true } : { ...snippet, active: false };
    });
    dispatch({ type: 'INITIAL', payload: initialSnippets });
  });
};

export const saveSnippet = (snippet) => (dispatch) => {
  console.log(snippet);
  ipcRenderer
    .invoke('editSnippet', snippet)
    .then((res) => {
      console.log(res);
      dispatch({ type: 'UPDATE', payload: res });
    })
    .catch((err) => console.log(err));
};
