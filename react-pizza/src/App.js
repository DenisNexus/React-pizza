import React,{useState} from 'react';
import './scss/app.scss'
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import {Routes,Route} from 'react-router-dom'
import AppContext from './components/Context';

function App() {
  const[inputValue,setIntutValue]=useState("")
  return (
    <AppContext.Provider value={{inputValue,setIntutValue}}>
    <div className="wrapper">
      <Header/>
    <div className="content">
      <div className="container">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </div>
  </div>
  </AppContext.Provider>
  );
}

export default App;
