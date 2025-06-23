import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './pages/ShopList';
import AddShop from './pages/AddShop';
import New from './pages/NewOrders';
import Home from './pages/Home';
import Login from './pages/login';
import Lorry from './pages/LorryService';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/list" element={<List />} />
        <Route path="/add" element={<AddShop />} />
        <Route path="/new" element={<New />} />
        <Route path="/" element={<Home />} />
        <Route path="/lorry" element={<Lorry />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
