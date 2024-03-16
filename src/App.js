import React, { useEffect, useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
// import logo from './assets/logo-high-res.svg'
// import cartIcon from './assets/shopping_cart.svg'
import { EN, ET, RU } from './lang/lang'

const App = () => {
  const [lang, setLang] = useState(EN);

  const config = { lang, setLang };

  useEffect(() => {
    setLang(ET);
  }, [])

  return (
    <>
      <Navbar config={config} />
    </>
  )
}

export default App;
