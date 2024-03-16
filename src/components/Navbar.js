import React, { useEffect, useState } from 'react'
import logo from '../assets/logo-high-res.svg'
import cartIcon from '../assets/shopping_cart.svg'
import { EN, ET, RU } from '../lang/lang'

const Navbar = ({ config }) => {
    const { lang, setLang } = config;

    const [count, setCount] = useState(0);
    const [menu, setMenu] = useState("");
    const [menuSelected, setMenuSelected] = useState(-1);

    const returnMenuHr = (string) => {
        const menuHr = menu === string ? <div className='abs-container'><hr className={`hr-anim`} /></div> : <></>;
        const menuSelectedHr = menuSelected === string ? <div className='abs-container'><hr className={`hr-anim2`} /></div> : <></>;
        return (menu !== string ? menuSelectedHr : menuHr);
    };

    const getCount = () => {
        return count > 9 ? '9+' : count;
    }

    const menuItem = (title, id) => {
        return <li className={`${menuSelected === id ? 'item-selected' : ''}`}
            onClick={(e) => {
                setMenuSelected(id);
                setMenu('');
            }}
            onMouseEnter={(e) => {
                menuSelected !== id ? setMenu(id) : setMenu('');
            }}
            onMouseLeave={(e) => {
                setMenu('');
            }}>
            {title}{returnMenuHr(id)}
        </li>
    }

    const menuItemsArray = [
        { key: 0, value: (id) => menuItem(lang['nav']['item1'], id) },
        { key: 1, value: (id) => menuItem(lang['nav']['item2'], id) },
        { key: 2, value: (id) => menuItem(lang['nav']['item3'], id) },
    ]

    return (
        <div>
            <div className="navbar">
                <div className="nav-logo">
                    <a href='/'>
                        <img src={logo} alt="logo" />
                    </a>
                </div>
                <ul className="nav-menu">
                    {menuItemsArray.map(item => {
                        return item.value(item.key);
                    })}
                </ul>
                <div className="nav-login-cart">
                    <button className='btn-outline'><img src='https://www.trumpit.ee/img/icon_lock.png' style={{ width: '12px', height: '12px' }} /> {lang['nav']['login']}</button>
                    {/* <button className='btn-fill' onClick={(e) => setCount(prevCount => prevCount + 1)}>{lang['nav']['shopping_cart']}</button> */}
                    <div className='login-cart-container' onClick={(e) => setCount(prevCount => prevCount + 1)}>
                        <img className='btn-cart' src={cartIcon} />
                        <div>
                            {count > 0 && (
                                <div className={`nav-cart-count ${count > 9 ? 'cart-count-max' : ''}`}>{getCount()}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Navbar