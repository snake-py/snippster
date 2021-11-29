import store from '../../utility/createStore';
const { ipcRenderer } = window;

export const getProjects = () => (dispatch) => {
  ipcRenderer.invoke('getProjects').then((res) => {
    const activeProject = localStorage.getItem('lastActiveProject') ? localStorage.getItem('lastActiveProject') : res.toActivate;
    const projects = res.all.projects.map((project) => {
      return project.id === activeProject ? { ...project, active: true } : { ...project, active: false };
    });
    dispatch({ type: 'INITIAL_PROJECTS', payload: projects });
  });
};

export const getLanguages = () => (dispatch) => {
  ipcRenderer.invoke('getAppLanguages').then((res) => {
    console.log('Languages');
    console.log(res);
    dispatch({ type: 'GET_LANGUAGES', payload: res.languages });
  });
};

export const makeAppReady = () => (dispatch) => {
  dispatch({ type: 'APP_READY', payload: '' });
};

export const switchProject = (project) => (dispatch) => {
  console.log(project);
  ipcRenderer.invoke('getSnippets', project.id).then((res) => {
    const snippets = res.snippets.map((snippet, index) => {
      return index === 0 ? { ...snippet, active: true, isSaved: true } : { ...snippet, active: false, isSaved: true };
    });
    dispatch({ type: 'SWITCH_PROJECT_SNIPPETS', payload: snippets });
    dispatch({ type: 'SWITCH_PROJECT', payload: project });
  });
};

export const querySnippet = (query, project) => (dispatch) => {
  dispatch({ type: 'QUERY_SNIPPET', payload: query });
  const data = {
    query: query,
    project: project,
  };
  ipcRenderer.invoke('filterSnippets', data).then((res) => {
    if (res.snippets.length > 0) {
      const snippets = res.snippets.map((snippet, index) => {
        if (snippet) {
          return index === 0 ? { ...snippet, active: true, isSaved: true } : { ...snippet, active: false, isSaved: true };
        }
      });

      if (query.slice(0, 2) === '/g') {
        dispatch({ type: 'OPEN_QUERY_VIEW', payload: '' });
        dispatch({ type: 'QUERY_SNIPPET_GLOBAL', payload: snippets });
      } else {
        dispatch({ type: 'QUERY_SNIPPET_IN_PROJECT', payload: snippets });
      }
      dispatch({
        type: 'ACTIVATE',
        payload: snippets.filter((snippet) => {
          if (snippet.active === true) {
            return snippet;
          }
        })[0],
      });
    } else {
      dispatch({ type: 'QUERY_RETURNED_NULL', payload: '' });
    }
  });
};

export const globalQuery = (query) => (dispatch) => {
  if (query.slice(0, 2) !== '/g') {
    query = `/g ${query}`;
  }
  dispatch({ type: 'QUERY_SNIPPET', payload: query });
  const data = {
    query: query,
  };
  ipcRenderer.invoke('filterSnippets', data).then((res) => {
    if (res.snippets.length > 0) {
      const snippets = res.snippets.map((snippet, index) => {
        return index === 0 ? { ...snippet, active: true, isSaved: true } : { ...snippet, active: false, isSaved: true };
      });
      dispatch({ type: 'QUERY_SNIPPET_GLOBAL', payload: snippets });
      dispatch({
        type: 'ACTIVATE',
        payload: snippets.filter((snippet) => {
          if (snippet.active === true) {
            return snippet;
          }
        })[0],
      });
    } else {
      dispatch({ type: 'QUERY_RETURNED_NULL', payload: '' });
    }
  });
};

export const resetQuery = (activeProject) => (dispatch) => {
  if (activeProject.id) {
    ipcRenderer.invoke('getSnippets', activeProject.id).then((res) => {
      const initialSnippets = res.snippets.map((snippet, index) => {
        return index === 0 ? { ...snippet, active: true, isSaved: true } : { ...snippet, active: false, isSaved: true };
      });
      dispatch({ type: 'INITIAL', payload: initialSnippets });
      dispatch({ type: 'RESET_QUERY', payload: '' });
    });
  } else {
    dispatch({ type: 'RESET_QUERY', payload: '' });
    dispatch({ type: 'REMOVE_QUERIED_SNIPPET', payload: '' });
  }
};

export const openQueryViewOnClick = () => (dispatch) => {
  dispatch({ type: 'OPEN_QUERY_VIEW', payload: '' });
  dispatch({ type: 'REMOVE_QUERIED_SNIPPET', payload: '' });
};

export const deleteProject = () => (dispatch) => {
  ipcRenderer.invoke('deleteProject', store.getState().app.activeProject).then((res) => {
    dispatch({ type: 'INITIAL_PROJECTS', payload: res.remaining.projects });
    console.log(res.toActivate);
    if (res.toActivate) {
      console.log(res.toActivate);
      dispatch(switchProject(res.toActivate));
    }
  });
};

export const openSnippsterMarket = () => (dispatch) => {
  dispatch({ type: 'OPEN_SNIPPSTER_MARKET', payload: '' });
}