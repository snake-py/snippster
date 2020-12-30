import store from '../../utility/createStore';
const { ipcRenderer } = window.require('electron');

export const activateSnippet = (snippet) => (dispatch) => {
  dispatch({
    type: 'ACTIVATE',
    payload: snippet,
  });
};

export const activateSnippetQuerieList = (snippet) => (dispatch) => {
  dispatch({ type: 'ACTIVATE_IN_QUERIED_STATE', payload: snippet });
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
  const activeProject = localStorage.getItem('lastActiveProject') ? localStorage.getItem('lastActiveProject') : 1;
  ipcRenderer.invoke('getSnippets', activeProject).then((res) => {
    const initialSnippets = res.snippets.map((snippet, index) => {
      return index === 0 ? { ...snippet, active: true, isSaved: true } : { ...snippet, active: false, isSaved: true };
    });
    dispatch({ type: 'INITIAL', payload: initialSnippets });
  });
};

export const updateLanguage = (snippet, language, languages) => (dispatch) => {
  const newLanguage = languages.filter((lan) => lan.language === language)[0];
  console.log(newLanguage.id);
  snippet = {
    ...snippet,
    language: language,
    language_short: newLanguage.language_short,
    language_id: newLanguage.id,
    languageIcon: newLanguage.languageIcon,
    framework: '',
    frameworkIcon: '',
    framework_id: null,
    isSaved: false,
  };
  dispatch({ type: 'UPDATE_LANGUAGE', payload: snippet, view: store.getState().app.queriedView });
};

export const updateFramework = (snippet, framework, languages) => (dispatch) => {
  const frameworks = languages.filter((lan) => lan.language === snippet.language)[0].framework;
  const fram = frameworks.filter((fw) => fw.framework === framework)[0];
  snippet = { ...snippet, framework: fram.framework, frameworkIcon: fram.frameworkIcon, framework_id: fram.id, isSaved: false };
  dispatch({ type: 'UPDATE_FRAMEWORK', payload: snippet, view: store.getState().app.queriedView });
};

export const addSnippet = () => (dispatch) => {
  ipcRenderer.invoke('addSnippet', store.getState().app.activeProject.id).then((res) => {
    console.log(res);
    const snippet = {
      ...res,
      active: true,
      isSaved: true,
    };
    console.log(snippet);
    dispatch({ type: 'ADD_SNIPPET', payload: snippet });
  });
};

export const saveSnippet = () => (dispatch) => {
  ipcRenderer
    .invoke('editSnippet', store.getState().snippets.activeSnippet)
    .then((res) => {
      dispatch({ type: 'UPDATE', payload: res });
    })
    .catch((err) => console.log(err));
};

export const deleteSnippet = () => (dispatch) => {
  ipcRenderer
    .invoke('deleteSnippet', store.getState().snippets.activeSnippet)
    .then((res) => {
      dispatch({ type: 'DELETE_SNIPPET', payload: store.getState().snippets.activeSnippet });
    })
    .catch((err) => console.log(err));
};
