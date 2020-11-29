import React from 'react';
import MainWindow from './FirstLevel/MainWindow';
import SideMenu from './FirstLevel/SideMenu';

export default function LoadedApp() {
  return (
    <>
      <SideMenu />
      <MainWindow />
    </>
  );
}
