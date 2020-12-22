const electron = require('electron');
const { ipcRenderer } = electron;

const input = document.querySelector('input');
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  ipcRenderer.invoke('addProjectToMain', input.value);
});
