import React from 'react';
import { useSelector } from 'react-redux';

export default function BottomBar() {
  const appState = useSelector((state) => state.app);
  const snippetState = useSelector((state) => state.snippets);
  
  return (
    <div className="bottom-bar">
      <ul className="bottom-bar__list">
      <li className="bottom-bar__list-item">{appState.activeProject.title ? 'Project Title: ' + appState.activeProject.title : 'Global Query'}</li>
      <li className="bottom-bar__list-item bottom-bar__list-item--consola">Amount of loaded Snippets {snippetState.snippets.length}</li>
        <li className="bottom-bar__list-item bottom-bar__list-item--consola">V{appState.version}</li>
      </ul>
      <div className="bottom-bar__version"></div>
    </div>
  );
}
