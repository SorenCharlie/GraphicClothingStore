import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// Import components
import Header from './components/header';
import Footer from './components/footer';
import GraphicClothingShop from './pages/clothing';
import GraphicImagesPage from './pages/graphicImages';
import CheckoutPage from './pages/checkout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
        <Route path="/" element={<GraphicClothingShop />} />
          <Route path="/graphic-images" element={<GraphicImagesPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        <div>
          <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <Footer />
      </div>
    </Router>
  )
}

export default App