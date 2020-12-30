const electron = require('electron');
const { ipcRenderer } = electron;

const input = document.querySelector('#project-input');
const file = document.querySelector('#icon');
const btn = document.querySelector('button');

file.addEventListener('change', () => {
  if (file.value.slice(-4) !== '.svg') {
    displayMessage();
    btn.removeEventListener('click');
  } else {
    btn.removeEventListener('click');
    btn.addEventListener('click', () => {
      ipcRenderer.invoke('addProjectToMain', { title: input.value, icon: file.files[0].path });
    });
  }
});

btn.addEventListener('click', () => {
  ipcRenderer.invoke('addProjectToMain', { title: input.value, icon: file.files[0].path });
});

function displayMessage() {}
