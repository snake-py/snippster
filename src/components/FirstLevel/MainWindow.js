import React, { Component } from 'react';
import SnippetCodeEditor from '../MainWindow/SnippetCodeEditor';
import SnippetResults from '../MainWindow/SnippetResults';
import SnippetView from '../MainWindow/SnippetView';
import '../../static/scss/_mainWindow.scss';
const { ipcRenderer } = window.require('electron');

export default class MainWindow extends Component {
  componentWillMount() {
    // ipcRenderer.invoke('getSnippets').then((res) => console.log(res));

  }
  addSnippet = () => {
    ipcRenderer
      .invoke('addSnippet', {
        title: 'New Snippet',
        description: 'I am the new snippet',
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="main-window-wrapper">
        <SnippetResults />
        <SnippetView />
        <SnippetCodeEditor />
      </div>
    );
  }
}
