const electron = require('electron');
const { ipcRenderer } = electron;

const input = document.querySelector('#project-input');
const file = document.querySelector('#icon');
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  ipcRenderer.invoke('addProjectToMain', { title: input.value, icon: file.files[0].path });
});
