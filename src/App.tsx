import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ChatBot } from './components/ChatBot';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import BasketPage from './pages/BasketPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <ChatBot />
    </div>
  );
}

export default App;