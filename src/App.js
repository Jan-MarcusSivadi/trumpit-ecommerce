import React, { useEffect, useState } from 'react'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
// import logo from './assets/logo-high-res.svg'
// import cartIcon from './assets/shopping_cart.svg'
import { EN, ET, RU } from './lang/lang'

const App = () => {
  const [lang, setLang] = useState(EN);

  const config = { lang, setLang };

  useEffect(() => {
    // setLang(ET);
    console.log('test', lang['route']['login'])
  }, [])

  return (
    <BrowserRouter>
      <Navbar config={config} />
      <Routes>
        <Route path='/' element={lang['route_result']['home']} />
        <Route path={'/' + lang['route']['products']} element={lang['route_result']['products']} />
        <Route path={'/' + lang['route']['about']} element={lang['route_result']['about']} />
        <Route path={'/' + lang['route']['login']} element={lang['route_result']['login']} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
