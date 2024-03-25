import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import logo from '../assets/logo-high-res.svg'
import cartIcon from '../assets/shopping_cart.svg'

import globalRoutes from '../lang/global_routes.json'

const Navbar = ({ config }) => {
    const [t, i18n] = useTranslation("global");

    const [menuSelected, setMenuSelected] = useState('init');
    const [menuActive, setMenuActive] = useState(-1);

    const { pathname, navigate } = config;

    const getRoutesArrayFromGlobalRoutes = (globalRoutes) => {
        const routesArray = Object.keys(globalRoutes).map((key) => [key, globalRoutes[key]]);
        let routes = [];
        routesArray.forEach((key) => {
            Object.keys(key[1]).forEach(k => {
                routes.push({ lang: key[0], key: k, value: key[1][k] });
            });
        });
        return routes;
    }

    const findRouteByKey = (routes, path) => {
        return routes.find(r => path == r.key || path == r.key.slice(0, r.key.length - 1));
        //OLD: routerMenu.find(r => path == r.route || path == r.route.slice(0, r.route.length - 1));
    }

    /* 
    syncronize navigation menu 
    with URL path
    */
    useEffect(() => {
        const path = pathname.slice(1);
        let routes = getRoutesArrayFromGlobalRoutes(globalRoutes);
        const found = findRouteByKey(routes, path);
        const fallbackPath = routerMenu[0].route;

        if (found) {
            if (menuActive !== found.key) {
                setMenuActive(found.key);
            }
            return
        } else {
            setMenuActive(fallbackPath);
        }
    }, [pathname, menuActive]); // routes, pathname, menuActive

    const returnMenuHr = (string) => {
        return (menuActive === string) ? (
            <div className='abs-container'>
                <hr className={`hr-anim2`} />
            </div>
        ) : (menuSelected === string) ? (
            <div className='abs-container'>
                <hr className={`hr-anim`} />
            </div>
        ) : <></>;
    };

    const routeElement = (route, to, key, color) => {
        const isLink = typeof to !== 'number';

        const { title } = route;

        console.log('key', pathname, title, to)

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
                <li key={key} className={`${(menuActive === to) ? 'item-selected' : (menuSelected === to ? 'item-select' : 'item-deselect')}`}>
                    {isLink ? (<div style={color ? { color: '#ff4500' } : {}}>{title}{returnMenuHr(to)}</div>) : <>{title}</>}
                </li>
            </div>
        </Link> : <></>
    }

    const getRouteKey = (id) => {
        const arr = id.split('.');
        const key = arr[arr.length - 1];
        const value = i18n.getDataByLanguage(i18n.language)['global']['router']['routes'][key];
        return value;
    }

    const getNavRouteKey = (id) => {
        const arr = id.split('.');
        const key = arr[arr.length - 1];
        const value = i18n.getDataByLanguage(i18n.language)['global']['nav'][key];
        // const routePathname = i18n.getDataByLanguage(i18n.language)['global']['router']['routes'][key];
        // console.log('ab', routePathname)
        // const routes = globalRoutes[i18n.language];
        // const routeKeys = Object.keys(routes).map(r => [r, routes[r]]);
        // console.log('abc', routeKeys)
        // const pathname = routeKeys.find(i => i[0] == routePathname);
        // console.log('abcd', pathname)
        return { title: value };
    }

    const routerMenu = [
        { route: '/', element: (to, key) => routeElement(getNavRouteKey('nav.home'), to, key) },
        { route: getRouteKey('router.routes.iphone'), element: (to, key) => routeElement(getNavRouteKey('nav.iphone'), to, key) },
        { route: getRouteKey('router.routes.ipad'), element: (to, key) => routeElement(getNavRouteKey('nav.ipad'), to, key) },
        { route: getRouteKey('router.routes.mac'), element: (to, key) => routeElement(getNavRouteKey('nav.mac'), to, key) },
        { route: getRouteKey('router.routes.watch'), element: (to, key) => routeElement(getNavRouteKey('nav.watch'), to, key) },
        { route: getRouteKey('router.routes.other_devices'), element: (to, key) => routeElement(getNavRouteKey('nav.other_devices'), to, key) },
        { route: getRouteKey('router.routes.accessories'), element: (to, key) => routeElement(getNavRouteKey('nav.accessories'), to, key) },
        { route: getRouteKey('router.routes.campaign'), element: (to, key) => routeElement(getNavRouteKey('nav.campaign'), to, key, '#FF0000') },
        { route: getRouteKey('router.routes.device_repurchase'), element: (to, key) => routeElement(getNavRouteKey('nav.device_repurchase'), to, key) },
        { route: getRouteKey('router.routes.maintenance'), element: (to, key) => routeElement(getNavRouteKey('nav.maintenance'), to, key) },
        { route: getRouteKey('router.routes.rent'), element: (to, key) => routeElement(getNavRouteKey('nav.rent'), to, key) },
    ]

    return (
        <header className="site-header">
            <div className="nav-logo">
                <Link to={'/'}>
                    <img src='https://en.upgreat.ee/wp-content/uploads/2023/07/upgreat-logo-dark-green-transparent-1.svg' alt='UPGR8 OÜ' />
                    {/* <img src={logo} alt="logo" /> */}
                </Link>
            </div>
            <div className="site-header-main">
                <div className="header-main-top">
                    <div className="main-top-container">
                        <div className="contacts-desktop">
                            <p>E-P 10-19</p>
                            <p>+372 600 1120</p>
                        </div>
                        <div className="additional-menu">
                            <ul className="additional-menu-container">
                                <li><a href="https://upgreat.ee/grade/">Välimuste kategooriad</a></li>
                                <li><a href="https://upgreat.ee/ettevottest/">Ettevõttest</a></li>
                                <li><a href="https://upgreat.ee/jarelmaks/">Järelmaks</a></li>
                                <li><a href="https://upgreat.ee/upgreat-for-business/">Ärikliendile</a></li>
                                <li><a href="https://upgreat.ee/kontakt/">Kontakt</a></li>
                                <li><a href="https://upgreat.ee/uudised/">Uudised</a></li>
                            </ul>
                        </div>
                        <div className="mini-cart">
                            <p>Ostukorv 0€ (0)</p>
                            <div className="mini-cart-button">
                                <a href="https://upgreat.ee/kassa/" className="button button-fill button-small">Maksa</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar">
                    <nav className="site-nav">
                        <ul className="nav-menus">
                            <div className='nav-menu'>
                                {routerMenu.map((item, key) => {
                                    return item.element(item.route, key);
                                })}
                            </div>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Navbar