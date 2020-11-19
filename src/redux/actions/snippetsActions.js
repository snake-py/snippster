const { ipcRenderer } = window.require('electron');


export const activateSnippet = (snippets) => {
  return {
    type: 'ACTIVATE',
    payload: snippets,
  };
};

export const setInitialSnippets = () => (dispatch) => {
  console.log('initial');
  ipcRenderer.invoke('getSnippets').then((res) => {
    const initialSnippets = res.snippets.map((snippet, index) => {
      return index === 0 ? { ...snippet, active: true } : { ...snippet, active: false };
    });
    dispatch({ type: 'INITIAL', payload: initialSnippets });
  });
};
