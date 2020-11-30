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
    dispatch({ type: 'INITIAL', payload: snippets });
    dispatch({ type: 'SWITCH_PROJECT', payload: project });

    console.log(snippets);
  });
};
