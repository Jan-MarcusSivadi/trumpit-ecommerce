import React, { useEffect, useState } from 'react'
// import './App.css';
// import cart_img from './assets/cart_icon.png'

function App() {
  const [count, setCount] = useState(0);
  const [menu, setMenu] = useState("ettevõttest");

  const returnSelected = (string) => {
    return menu === string ? <hr /> : <></>;
  };

  const getCount = () => {
    return count > 9 ? '9+' : count;
  }

  return (
    <div>
      <div className="navbar">
        <div className="nav-logo">
          <a href='/'>
            <img src="https://www.trumpit.ee/img/logo.png" alt="logo" width={'55px'} />
          </a>
        </div>
        <ul className="nav-menu">
          <li onClick={(e) => setMenu('ettevõttest')}>ETTEVÕTTEST{returnSelected('ettevõttest')}</li>
          <li onClick={(e) => setMenu('teenused')}>TEENUSED{returnSelected('teenused')}</li>
          <li onClick={(e) => setMenu('referentsid')}>REFERENTSID{returnSelected('referentsid')}</li>
          <li onClick={(e) => setMenu('blogi')}>BLOGI{returnSelected('blogi')}</li>
          <li onClick={(e) => setMenu('kontakt')}>KONTAKT{returnSelected('kontakt')}</li>
        </ul>
        <div className="nav-login-cart">
          <button className='btn-outline'><img src='https://www.trumpit.ee/img/icon_lock.png' style={{ width: '12px', height: '12px' }} /> SISENE</button>
          {/* <button className='btn-fill'>OSTUKORV</button> */}
          <img className='btn-cart' src='https://www.trumpit.ee/img/icon_shop.png' onClick={(e) => setCount(prevCount => prevCount + 1)} />
          <div className="nav-cart-count">{getCount()}</div>
        </div>
      </div>
    </div >
  );
}

export default App;
