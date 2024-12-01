import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import How from './pages/How/How.jsx';
import SearchResults from "./pages/SearchResults/SearchResults.jsx";
import './App.scss'

function App() {

  return (
      <BrowserRouter>
          <div className="app">
              <Navbar />
              <main className="app__main">
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/search" element={<SearchResults />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/how" element={<How />} />
                  </Routes>
              </main>
              <Footer />
          </div>
      </BrowserRouter>
  )
}

export default App
