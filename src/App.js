import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductDetails from './components/ProductDetails';
import CompareProducts from './components/CompareProducts';
import './App.css';

function App() {
  const [compareList, setCompareList] = useState([]); // State for comparison list

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={<ProductDetails compareList={compareList} setCompareList={setCompareList} />}
          />
          <Route
            path="/compare"
            element={<CompareProducts compareList={compareList} setCompareList={setCompareList} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;