import MainWindow from './components/FirstLevel/MainWindow';
import SideMenu from './components/FirstLevel/SideMenu';

function App() {
  return (
    <div className="App">
      <div>
        <SideMenu />
      </div>
      <div>
        <MainWindow />
      </div>
    </div>
  );
}

export default App;
