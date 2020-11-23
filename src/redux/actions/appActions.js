const { ipcRenderer } = window.require('electron');

export const getProjects = () => (dispatch) => {
    console.log('getting Projects');
  ipcRenderer.invoke('getProjects').then((res) => {console.log(res);});
};
