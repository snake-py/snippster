const { ipcRenderer } = window.require('electron');

export const activateSnippet = (snippet) => {
  console.log('activate');
  console.log(snippet);
  return {
    type: 'ACTIVATE',
    payload: snippet,
  };
};

export const editTitle = (snippet, title) => (dispatch) => {
  dispatch({ type: 'EDIT_TITLE', payload: { snippet: snippet, title: title } });
};

export const editDescription = (snippet, description) => (dispatch) => {
  dispatch({ type: 'EDIT_DESCRIPTION', payload: { snippet: snippet, description: description } });
};

export const editCode = (snippet, code) => (dispatch) => {
  dispatch({ type: 'EDIT_CODE', payload: { snippet: snippet, code: code } });
};

export const setInitialSnippets = () => (dispatch) => {
  ipcRenderer.invoke('getSnippets').then((res) => {
    const initialSnippets = res.snippets.map((snippet, index) => {
      return index === 0 ? { ...snippet, active: true, isSaved: true } : { ...snippet, active: false, isSaved: true };
    });
    dispatch({ type: 'INITIAL', payload: initialSnippets });
  });
};

export const updateLanguage = (snippet, language, languages) => (dispatch) => {
  console.log(language);
  const newLanguage = languages.filter((lan) => lan.language === language)[0];
  console.log(newLanguage.id);
  snippet = { ...snippet, language: language, language_id: newLanguage.id, languageIcon: newLanguage.languageIcon, framework: '', frameworkIcon: '', framework_id: null, isSaved: false };
  dispatch({ type: 'UPDATE_LANGUAGE', payload: snippet });
};

export const updateFramework = (snippet, framework, languages) => (dispatch) => {
  const frameworks = languages.filter((lan) => lan.language === snippet.language)[0].framework;
  const fram = frameworks.filter((fw) => fw.framework === framework)[0];
  snippet = { ...snippet, framework: fram.framework, frameworkIcon: fram.frameworkIcon, framework_id: fram.id, isSaved: false };
  dispatch({ type: 'UPDATE_FRAMEWORK', payload: snippet });
};

export const addSnippet = () => (dispatch) => {
  console.log('adding');
  ipcRenderer.invoke('addSnippet').then((res) => {
    console.log(res);
    const snippet = {
      ...res,
      active: true,
      isSaved: true,
    };
    console.log(snippet);
    dispatch({ type: 'ADD', payload: snippet });
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

export const deleteSnippet = (snippet, snippets) => (dispatch) => {
  console.log(snippet);
  ipcRenderer
    .invoke('deleteSnippet', snippet)
    .then((res) => {
      dispatch({ type: 'DELETE_SNIPPET', payload: snippet });
    })
    .catch((err) => console.log(err));
};
