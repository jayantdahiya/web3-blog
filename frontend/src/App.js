import './App.css';
import Content from './Components/Content';
import Footer from './Components/Footer';
import SideBar from './Components/SideBar';

function App() {
  return (
    <div className="app">
      <SideBar />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
