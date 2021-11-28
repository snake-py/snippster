const input = document.querySelector('#project-input');
const file = document.querySelector('#icon');
const btn = document.querySelector('button');

file.addEventListener('change', () => {
  if (file.value.slice(-4) !== '.svg' && file.value !== '') {
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
  if (input.value !== '') {
    ipcRenderer.invoke('addProjectToMain', { title: input.value, icon: file.value ? file.files[0].path : '' });
  } else {
    document.querySelector('.title-warning-2').classList.toggle('invis');
    setTimeout(() => {
      document.querySelector('.title-warning-2').classList.toggle('invis');
    }, 3000);
  }
});

ipcRenderer.on('projectTitleIsNotUnique', (e) => {
  document.querySelector('.title-warning-1').classList.toggle('invis');
  setTimeout(() => {
    document.querySelector('.title-warning-1').classList.toggle('invis');
  }, 3000);
});

function displayMessage() {}
