import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
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
        const isLink = typeof id !== 'number';
        console.log(
            title, typeof id
        )
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
            {isLink ? (<Link to={'/' + id}>{title}{returnMenuHr(id)}</Link>) : <>{title}{returnMenuHr(id)}</>}
        </li>
    }

    const menuItemsArray = [
        { key: lang['route']['products'], element: (id) => menuItem(lang['nav']['products'], id) },
        { key: lang['route']['about'], element: (id) => menuItem(lang['nav']['about'], id) },
        { key: 0, element: (id) => menuItem(lang['nav']['search'], id) },
    ]

    return (
        <nav>
            <div className="navbar">
                <div className="nav-logo">
                    <a href='/'>
                        <img src={logo} alt="logo" />
                    </a>
                </div>
                <ul className="nav-menu">
                    {menuItemsArray.map(item => {
                        return item.element(item.key);
                    })}
                </ul>
                <div className="nav-login-cart">
                    <Link onClick={(e) => {
                        setMenuSelected(-1);
                        setMenu('');
                    }} to={lang['route']['login']} className='btn-outline'><img src='https://www.trumpit.ee/img/icon_lock.png' style={{ width: '12px', height: '12px' }} /> {lang['nav']['login']}</Link>
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
        </nav >
    );
}

export default Navbar