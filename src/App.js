import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import './App.css';
// import { EN, ET, RU } from './lang/lang'
import Navbar from './components/Navbar';
import productsData from './db/products.json'
import routesJSON from './routes/routes'
import { use } from "i18next";

import globalRoutes from './lang/global_routes.json'

const refSort = (targetData, refData) => {
  // Create an array of indices [0, 1, 2, ...N].
  var indices = Object.keys(refData);

  // Sort array of indices according to the reference data.
  indices.sort(function (indexA, indexB) {
    if (refData[indexA] < refData[indexB]) {
      return -1;
    } else if (refData[indexA] > refData[indexB]) {
      return 1;
    }
    return 0;
  });

  // Map array of indices to corresponding values of the target array.
  // return indices.map(function (index) {
  //   return targetData[index];
  // });
  const sorted = indices.map(function (index) {
    return refData.filter(ref => ref.key === targetData[index]);
  });
  return sorted.filter(f => f.length > 0);
}

const jsonToObjArray = (array, sortingArr, excludeArray) => {
  const fields = array.map((field) => {
    return Object.entries(field).map(([k, v]) => {
      return { key: k, value: v }
    })[0];
  })

  let sorted;
  if (sortingArr && sortingArr.length > 0) {
    console.log('goal', sortingArr);
    console.log('before', fields);
    sorted = refSort(sortingArr, fields).map(item => item[0]);
    console.log('after', sorted);
  }

  if (sorted) return sorted;

  if (excludeArray && excludeArray.length <= 0) {
    return fields;
  }

  if (excludeArray && excludeArray.length > 0) {
    return fields.filter(s => !excludeArray.includes(s.key))
  }

  return fields
}

const App = () => {
  const [t, i18n] = useTranslation("global");
  const [appLanguage, setAppLanguage] = useState(i18n.language)
  const [products, setProducts] = useState(productsData);
  const [navLoaded, setNavLoaded] = useState(false);

  const location = useLocation();
  const { hash, pathname, search } = location;

  const navigate = useNavigate()

  const config = { products, setProducts, pathname, navigate };

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

  const findRouteByPath = (routes, path) => {
    return routes.find(r => path.includes(r.key) || path.includes(r.key.slice(0, r.key.length - 1)));
  }

  useEffect(() => {
    if (appLanguage) {
      const previousLng = i18n.language;
      let newLng = appLanguage;

      try {
        const tPrevious = i18n.getDataByLanguage(previousLng)['global'];
        const t = i18n.getDataByLanguage(newLng)['global'];
        const routesObjPrev = tPrevious['router']['routes'];
        const routesObj = t['router']['routes'];

        const routesArrayPrev = Object.keys(routesObjPrev).map((key) => [key, routesObjPrev[key]]);
        const routesArray = Object.keys(routesObj).map((key) => [key, routesObj[key]]);

        const path = pathname.slice(1);

        const translatedPathnameObj = routesArrayPrev.find(route => {
          const a = Object.keys(route).map((key) => [key, route[key]]);
          let tVal = a[1][1];
          // r.key || path == r.key.slice(0, r.key.length - 1)
          return path == tVal || path == tVal.slice(0, tVal.length - 1); //pathname.includes(tVal);
        });

        if (translatedPathnameObj) {
          const existingPathnameKey = translatedPathnameObj[0];
          console.log('test', translatedPathnameObj)

          if (existingPathnameKey) {
            const translatedPathname = routesArray.map((route) => {
              const routePathnameKey = route[0];
              const routePathnameVal = route[1];
              return routePathnameKey === existingPathnameKey ? routePathnameVal : undefined;
            }).filter(f => f)[0];

            console.log('test2', translatedPathname)

            if (translatedPathname) {
              console.log('TEST', i18n.language, pathname, translatedPathname)
              if (!pathname.includes(translatedPathname)) { // 
                // navigate(`/${translatedPathname}`, { replace: true });
              }
            } else {
              console.log('404')
              if (pathname !== '/' && pathname !== '') {
                navigate('/');
              }
            }

          }
        }
        i18n.changeLanguage(newLng);
      } catch (error) {
        console.error('something went wrong :(', error);
      }
    }
  }, [appLanguage, i18n]);

  /*
  syncronize navigation menu 
  with URL path
  */
  useEffect(() => {
    // if (appLanguage !== 'en') setTimeout(() => {
    //   setAppLanguage('en')
    // }, [4000])
  }, [appLanguage]);

  useEffect(() => {
    if (globalRoutes) {
      let routes = getRoutesArrayFromGlobalRoutes(globalRoutes);
      console.log(routes);
      const foundRoute = findRouteByPath(routes, pathname);
      if (foundRoute) {
        const { lang, key, value } = foundRoute;
        console.log('findRouteByPathname', lang, key, value);
        i18n.changeLanguage(lang).then(() => {
          navigate(key);
          setNavLoaded(true);
        });
      } else {
        if (pathname != '/') {
          console.log('findRouteByPathname', '404 Not Found.');
          navigate('/');
        } else {
          setNavLoaded(true);
        }
      }
    }
  }, [pathname])

  const HomePage = () => {
    return (
      <>
        {/* <h3 className='page-title'>{t('router.result.home')}</h3> */}
        <section className="hero">
          <div className="max-width">
            <div className="slider">
              <div className="slider-hero">
                <div className="slider-content">
                  <div className="hero-slide-left">
                    <div className="hero-slide-info">
                      <h1>
                        <span><strong>{t('pages.home.hero.title-1')}</strong></span>
                        <span>{t('pages.home.hero.title-2')}</span>
                      </h1>
                      <h4><strong>{t('pages.home.hero.subtitle-1')}</strong> {t('pages.home.hero.subtitle-2')} <strong>{t('pages.home.hero.subtitle-3')}</strong></h4>
                      <a href="https://upgreat.ee/tootekategooria/kampaaniatooted/" className="button button-outline button-md">
                        <span className="more-link">{t('pages.home.hero.btn-cta')}</span>
                      </a>
                    </div>
                  </div>
                  <div className="hero-slide-right">
                    <div className="hero-slide-image">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  const ProductsPage = ({ config }) => {
    const { products, setProducts } = config;

    return (
      <div className='product-list-container'>
        <h2 className='page-title'>{t('route_result.products')}</h2>
        <hr />
        <div className='product-list'>
          {products && products.length > 0 ? products.map((product) => {
            const json1 = product['details'];
            const images = product['images'];
            const fieldQuery = ['Name', 'Short name'];
            const fields = jsonToObjArray(json1, fieldQuery);

            return (
              <div className='product-card'>
                <div className='product-container'>
                  <div>
                    <img src={images[0]}></img>
                  </div>
                  <div>
                    <h4>{fields[0]?.value}</h4>
                    <p>{fields[1]?.value}</p>
                  </div>
                </div>
              </div>
            )
          }) : <h4>No Products :(</h4>}
        </div>
      </div>
    )
  }

  return (
    <>
      {navLoaded && <Navbar config={config} />}
      <main>
        <Routes>
          <Route path='/' element={<HomePage config={config} />} />
        </Routes>
        {/* <div className='container-main'>
          <div className='container'>
          </div>
        </div> */}
      </main>
    </>
  )
}

export default App;
