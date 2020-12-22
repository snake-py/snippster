const { ipcRenderer } = window.require('electron');

export const getProjects = () => (dispatch) => {
  console.log('getting Projects');
  ipcRenderer.invoke('getProjects').then((res) => {
    const activeProject = localStorage.getItem('lastActiveProject') ? localStorage.getItem('lastActiveProject') : 1;
    const projects = res.projects.map((project) => {
      return project.id === activeProject ? { ...project, active: true } : { ...project, active: false };
    });
    dispatch({ type: 'INITIAL_PROJECTS', payload: projects });
  });
};

export const getLanguages = () => (dispatch) => {
  console.log('getting Languages');
  ipcRenderer.invoke('getAppLanguages').then((res) => {
    console.log('Languages');
    console.log(res);
    dispatch({ type: 'GET_LANGUAGES', payload: res.languages });
  });
};

export const makeAppReady = () => (dispatch) => {
  console.log('Making Ready');
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
  console.log(data);
  console.log(query);
  ipcRenderer.invoke('filterSnippets', data).then((res) => {
    const snippets = res.snippets.map((snippet, index) => {
      return index === 0 ? { ...snippet, active: true, isSaved: true } : { ...snippet, active: false, isSaved: true };
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
  });
};

export const openQueryView = () => (dispatch) => {
  dispatch({ type: 'OPEN_QUERY_VIEW', payload: '' });
  dispatch({ type: 'DEACTIVATE_CURRENT_ACTIVE_SNIPPET', payload: '' });
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

export const addProject = () => (dispatch) => {
  console.log('adding project');
  ipcRenderer.invoke('addProject').then(res => {
    console.log(res);
  })
}

