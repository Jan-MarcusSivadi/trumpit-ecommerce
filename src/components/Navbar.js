import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import logo from '../assets/logo-high-res.svg'
import cartIcon from '../assets/shopping_cart.svg'

const Navbar = ({ config }) => {
    const [t, i18n] = useTranslation("global");

    const [menuSelected, setMenuSelected] = useState("");
    const [menuActive, setMenuActive] = useState(-1);

    const { pathname, navigate } = config;

    /* 
    syncronize navigation menu 
    with URL path
    */
    useEffect(() => {
        const path = pathname.slice(1);
        const found = routerMenu.find(r => r.route === path);
        const fallbackPath = routerMenu[0].route;

        if (found) {
            if (menuActive !== found.route) setMenuActive(found.route);
            return
        } else {
            setMenuActive(fallbackPath)
        }
    }, [pathname, menuActive]); // routes, pathname, menuActive

    const returnMenuHr = (string) => {
        // <hr className={`hr-anim`} />
        return (menuSelected === string || menuActive === string) ? (
            <div className='abs-container'>
                <hr className={`hr-anim2`} />
            </div>
        ) : <></>;
    };

    const routeElement = (title, to, key) => {
        const isLink = typeof to !== 'number';

        return to ? <Link to={to}
            onClick={(e) => {
                setMenuActive(to);
                setMenuSelected('');
            }}
            onMouseEnter={(e) => {
                menuActive !== to ? setMenuSelected(to) : setMenuSelected('');
            }}
            onMouseLeave={(e) => {
                setMenuSelected('');
            }}>
            <div>
                <li key={key} className={`${(menuActive === to) ? 'item-selected' : (menuSelected === to ? 'item-select' : '')}`}>
                    {isLink ? (<>{title}{returnMenuHr(to)}</>) : <>{title}</>}
                </li>
            </div>
        </Link> : <></>
    }

    const getRouteKey = (id) => {
        // const result = t(id);
        // return i18n.exists(id) ? t(id) : null;
        const arr = id.split('.');
        const navKey = arr[arr.length - 1];
        const foundVal = i18n.getDataByLanguage(i18n.language)['global']['router']['routes'][navKey]
        // console.log(id, foundVal)
        return foundVal; // i18n.getFixedT('et', null, id); //i18n.exists(i18next.getFixedT(null, null, id));
    }

    const routerMenu = [
        { route: '/', element: (to, key) => routeElement(t('nav.home'), to, key) },
        { route: getRouteKey('router.routes.iphone'), element: (to, key) => routeElement(t('nav.iphone'), to, key) },
        { route: getRouteKey('router.routes.ipad'), element: (to, key) => routeElement(t('nav.ipad'), to, key) },
        { route: getRouteKey('router.routes.mac'), element: (to, key) => routeElement(t('nav.mac'), to, key) },
        { route: getRouteKey('router.routes.watch'), element: (to, key) => routeElement(t('nav.watch'), to, key) },
        { route: getRouteKey('router.routes.other_devices'), element: (to, key) => routeElement(t('nav.other_devices'), to, key) },
        { route: getRouteKey('router.routes.accessories'), element: (to, key) => routeElement(t('nav.accessories'), to, key) },
        { route: getRouteKey('router.routes.campaign'), element: (to, key) => routeElement(t('nav.campaign'), to, key) },
        { route: getRouteKey('router.routes.device_repurchase'), element: (to, key) => routeElement(t('nav.device_repurchase'), to, key) },
        { route: getRouteKey('router.routes.maintenance'), element: (to, key) => routeElement(t('nav.maintenance'), to, key) },
        { route: getRouteKey('router.routes.rent'), element: (to, key) => routeElement(t('nav.rent'), to, key) },
    ]

    return (
        <header>
            <nav className='navbar-container'>
                <div className="navbar">
                    <div className="nav-logo">
                        <Link to={'/'}>
                            <img src='https://en.upgreat.ee/wp-content/uploads/2023/07/upgreat-logo-dark-green-transparent-1.svg' alt='UPGR8 OÜ' />
                            {/* <img src={logo} alt="logo" /> */}
                        </Link>
                    </div>
                    <ul className="nav-menus">
                        <div className='nav-menu'>
                            {routerMenu.map((item, key) => {
                                return item.element(item.route, key);
                            })}
                        </div>
                    </ul>
                </div>
            </nav >
        </header>
    );
}

export default Navbar