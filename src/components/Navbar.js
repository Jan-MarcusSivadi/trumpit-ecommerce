import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import logo from '../assets/logo-high-res.svg'
import cartIcon from '../assets/shopping_cart.svg'

import globalRoutes from '../lang/global_routes.json'

const Navbar = ({ config }) => {
    const [t, i18n] = useTranslation("global");

    const [menuSelected, setMenuSelected] = useState("");
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
        const arr = id.split('.');
        const key = arr[arr.length - 1];
        const value = i18n.getDataByLanguage(i18n.language)['global']['router']['routes'][key];
        return value;
    }

    const getNavRouteKey = (id) => {
        const arr = id.split('.');
        const key = arr[arr.length - 1];
        const value = i18n.getDataByLanguage(i18n.language)['global']['nav'][key];
        return value;
    }

    const routerMenu = [
        { route: '/', element: (to, key) => routeElement(t('nav.home'), to, key) },
        { route: getRouteKey('router.routes.iphone'), element: (to, key) => routeElement(getNavRouteKey('nav.iphone'), to, key) },
        { route: getRouteKey('router.routes.ipad'), element: (to, key) => routeElement(getNavRouteKey('nav.ipad'), to, key) },
        { route: getRouteKey('router.routes.mac'), element: (to, key) => routeElement(getNavRouteKey('nav.mac'), to, key) },
        { route: getRouteKey('router.routes.watch'), element: (to, key) => routeElement(getNavRouteKey('nav.watch'), to, key) },
        { route: getRouteKey('router.routes.other_devices'), element: (to, key) => routeElement(getNavRouteKey('nav.other_devices'), to, key) },
        { route: getRouteKey('router.routes.accessories'), element: (to, key) => routeElement(t('nav.accessories'), to, key) },
        { route: getRouteKey('router.routes.campaign'), element: (to, key) => routeElement(getNavRouteKey('nav.campaign'), to, key) },
        { route: getRouteKey('router.routes.device_repurchase'), element: (to, key) => routeElement(getNavRouteKey('nav.device_repurchase'), to, key) },
        { route: getRouteKey('router.routes.maintenance'), element: (to, key) => routeElement(getNavRouteKey('nav.maintenance'), to, key) },
        { route: getRouteKey('router.routes.rent'), element: (to, key) => routeElement(getNavRouteKey('nav.rent'), to, key) },
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