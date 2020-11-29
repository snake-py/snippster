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
    console.log('res:');
    console.log(res);
    // const projects = res.projects.map((project) => {
    //   return project.id === activeProject ? { ...project, active: true } : { ...project, active: false };
    // });
    // dispatch({ type: 'Languages', payload: languages });
  });

}

export const makeAppReady = () => (dispatch) => {
  console.log('Making Ready');
  dispatch({ type: 'APP_READY', payload: '' });
}