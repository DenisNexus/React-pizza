import React from 'react';
import './scss/app.scss'

import Header from './components/Header';
import Home from './pages/Home';

import {Routes,Route} from 'react-router-dom'

const Cart = React.lazy(()=>import('./pages/Cart'))
const NotFound = React.lazy(()=>import('./pages/NotFound'))
const FullPizza = React.lazy(()=>import('./components/FullPizza'))

function App() {
  return (
    <div className="wrapper">
      <Header/>
    <div className="content">
      <div className="container">
      <Routes>
        <Route path="/" element={<Home/>} />   
          <Route  
                path="/cart" 
                element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                      <Cart/>
                  </React.Suspense>
                } 
            />
        <Route 
              path="/pizza/:id" 
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                        <FullPizza/>
                </React.Suspense>
              }/>
        <Route 
        path="*" 
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
                    <NotFound />
          </React.Suspense>
        } 
        />
      </Routes>
    </div>
  </div>
  </div>
  );
}

export default App;
