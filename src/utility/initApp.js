import store from './createStore';
import registerIPCListners from "./ipcListeners";
const { ipcRenderer } = window.require('electron');

export default () => {
  getLanguages();
  getProjects();
  setInitialSnippets();
  registerIPCListners()
  makeAppReady();
  return { msg: 'test', store: store };
};

const getProjects = () => {
  console.log('execute');
  ipcRenderer.invoke('getProjects').then((res) => {
    const activeProject = localStorage.getItem('lastActiveProject') ? localStorage.getItem('lastActiveProject') : 1;
    const projects = res.projects.map((project) => {
      return project.id === activeProject ? { ...project, active: true } : { ...project, active: false };
    });
    console.log('execute 2');
    store.dispatch({ type: 'INITIAL_PROJECTS', payload: projects });
  });
};

const setInitialSnippets = () => {
  const activeProject = localStorage.getItem('lastActiveProject') ? localStorage.getItem('lastActiveProject') : 1;
  ipcRenderer.invoke('getSnippets', activeProject).then((res) => {
    const initialSnippets = res.snippets.map((snippet, index) => {
      return index === 0 ? { ...snippet, active: true, isSaved: true } : { ...snippet, active: false, isSaved: true };
    });
    store.dispatch({ type: 'INITIAL', payload: initialSnippets });
  });
};

const getLanguages = () => {
  console.log('getting Languages');
  ipcRenderer.invoke('getAppLanguages').then((res) => {
    store.dispatch({ type: 'GET_LANGUAGES', payload: res.languages });
  });
};

const makeAppReady = () => {
  console.log('Making Ready');
  store.dispatch({ type: 'APP_READY', payload: '' });
};
