import React, { useEffect } from 'react';
import MainWindow from '../../MainWindow';
import { useSelector } from 'react-redux';
import SideMenu from '../../SideMenu';
import BottomBar from '../../BottomBar';
export default function LoadedApp() {
  const appState = useSelector((state) => state.app);

  useEffect(() => {}, [appState.projects]);

  if (appState.projects.length) {
    return (
      <>
        <SideMenu />
        <MainWindow />
        <BottomBar />
      </>
    );
  } else {
    return (
      <>
        <div>
          <div className="message__empty-window">
            <div>
              Create a Project to add Snippets <br />  go to File and click on add Project
            </div>
          </div>
        </div>
      </>
    );
  }
}
