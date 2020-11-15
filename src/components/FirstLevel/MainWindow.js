import React, { Component } from 'react'
import SnippetCodeEditor from '../MainWindow/SnippetCodeEditor'
import SnippetResults from '../MainWindow/SnippetResults'
import SnippetView from '../MainWindow/SnippetView'
import '../../static/scss/_mainWindow.scss'
const { ipcRenderer } = window.require('electron');



export default class MainWindow extends Component {
    componentWillMount() {
        ipcRenderer.send('get:snippets')
        ipcRenderer.on('get:snippets', (e, snippets) => {
            console.log(snippets);
        })
    }
    render() {
        return (
            <div className="main-window-wrapper" >
             <SnippetResults />
             <SnippetView />
             <SnippetCodeEditor />   
            </div>
        )
    }
}
