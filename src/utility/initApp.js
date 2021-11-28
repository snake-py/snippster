import store from './createStore';
import registerIPCListners from './ipcListeners';
const { ipcRenderer } = window;

export default () => {
  getLanguages();
  getDir();
  getProjectsAndSnippets();
  registerIPCListners();
  getAppVersion()
  setTimeout(() => {
    makeAppReady();
  }, 1500);
  return { msg: 'test', store: store };
};

const getDir = () => {
  ipcRenderer.invoke('isDev').then((res) => {
    store.dispatch({ type: 'SET_IS_DEV', payload: res });
  });
};

const getProjectsAndSnippets = () => {
  ipcRenderer.invoke('getProjects').then((res) => {
    if (res.all.projects[0]) {
      const activeProject = localStorage.getItem('lastActiveProject') ? localStorage.getItem('lastActiveProject') : res.toActivate.id;
      const projects = res.all.projects.map((project) => {
        return project.id === activeProject ? { ...project, active: true } : { ...project, active: false };
      });
      store.dispatch({ type: 'INITIAL_PROJECTS', payload: projects });
      setInitialSnippets();
    } else {
      store.dispatch({ type: 'INITIAL_PROJECTS', payload: [] });
    }
  });
};

const setInitialSnippets = () => {
  const activeProject = localStorage.getItem('lastActiveProject') ? localStorage.getItem('lastActiveProject') : false;
  if (activeProject) {
    ipcRenderer.invoke('getSnippets', activeProject).then((res) => {
      const initialSnippets = res.snippets.map((snippet, index) => {
        return index === 0 ? { ...snippet, active: true, isSaved: true } : { ...snippet, active: false, isSaved: true };
      });
      store.dispatch({ type: 'INITIAL', payload: initialSnippets });
    });
  } else {
    ipcRenderer.invoke('getLastProject').then((lastProject) => {
      ipcRenderer.invoke('getSnippets', lastProject.id).then((res) => {
        const initialSnippets = res.snippets.map((snippet, index) => {
          return index === 0 ? { ...snippet, active: true, isSaved: true } : { ...snippet, active: false, isSaved: true };
        });
        store.dispatch({ type: 'INITIAL', payload: initialSnippets });
      });
    });
  }
};

const getLanguages = () => {
  ipcRenderer.invoke('getAppLanguages').then((res) => {
    store.dispatch({ type: 'GET_LANGUAGES', payload: res.languages });
  });
};

const getAppVersion = () => {
  ipcRenderer.invoke('getAppVersion').then((res) => {
    store.dispatch({ type: 'GET_VERSION', payload: res });
  });
};

const makeAppReady = () => {
  store.dispatch({ type: 'APP_READY', payload: '' });
};
