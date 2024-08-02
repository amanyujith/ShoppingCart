import './App.css';
import Home from './Home';
//import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Single from './Single';
import Navbar from './Navbar';
import Cart from './Cart';
import { CartProvider} from './Context/ShoppingCartContext';
import Orders from './Orders';
import Portal from './Portal';
import Admin from './Admin';
import Profile from './Login/Profile';
import { useAuth0 } from "@auth0/auth0-react";
import Edit from './Edit';
import NoAcces from './NoAcces';


function App() {
  const {isAuthenticated} =useAuth0();

 return <div>
  {/* <ShoppingCartProvider> */}
  <CartProvider>
 
  <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
       <Route path='/home' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/> 
      <Route path='/view/:id' element={<Single/>}/>
    <Route path='/buy' element={<Orders/>}/>
    <Route path='/portal' element={isAuthenticated?<Portal/>:''}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/edit/:id' element={<Edit/>}/>
    </Routes>
  </Router>
  </CartProvider>
  {/* </ShoppingCartProvider> */}
 </div>
}

export default App
