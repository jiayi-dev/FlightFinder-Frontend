import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home/Home.jsx';
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
                  </Routes>
              </main>
              <Footer />
          </div>
      </BrowserRouter>
  )
}

export default App
