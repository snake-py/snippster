import React from 'react';
import MainWindow from '../../MainWindow';
import SideMenu from '../../SideMenu';
// import TopMenu from '../../TopMenu';

export default function LoadedApp() {
  return (
    <>
      {/* <TopMenu /> */}

      {/* <div> */}
        <SideMenu />
        <MainWindow />
      {/* </div> */}
    </>
  );
}
