import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Routes from './components/Routes';

function App() {
  return (
    <Router>
      <div className="app">
        <Nav />
        <main>
          <Routes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;