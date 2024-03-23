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

// const { param1, param2 } = Object.fromEntries(new URLSearchParams(location.search));
// console.log("YES!!!", param1, param2);

const App = () => {
  const [t, i18n] = useTranslation("global");
  const [appLanguage, setAppLanguage] = useState(i18n.language)
  // const [lang, setLang] = useState(EN);
  const [products, setProducts] = useState(productsData);
  // const [routes, setRoutes] = useState({});

  const location = useLocation();
  const { hash, pathname, search } = location;

  const navigate = useNavigate()

  const config = { products, setProducts, pathname, navigate };

  useEffect(() => {
    if (appLanguage) {
      const previousLng = i18n.language;
      let newLng = appLanguage;

      // FIX: setup language switching per URI, put all URIs to one array, each row having language id 
      // TODO OLD: check if URI is in another language before setting new language

      try {
        const tPrevious = i18n.getDataByLanguage(previousLng)['global'];
        const t = i18n.getDataByLanguage(newLng)['global'];
        const routesObjPrev = tPrevious['router']['routes'];
        const routesObj = t['router']['routes'];

        // if (routesObj)

        // var routesKeysArr = Object.keys(routesObj).map((key) => key);
        const routesArrayPrev = Object.keys(routesObjPrev).map((key) => [key, routesObjPrev[key]]);
        const routesArray = Object.keys(routesObj).map((key) => [key, routesObj[key]]);

        const translatedPathnameObj = routesArrayPrev.find(route => {
          const a = Object.keys(route).map((key) => [key, route[key]])
          // let tKey = a[0];
          let tVal = a[1][1];
          // console.log(pathname, tVal, pathname.includes(tVal))
          return pathname.includes(tVal);
        });
        // console.log('translatedPathnameObj', existingPathnameKey)
        if (translatedPathnameObj) {
          const existingPathnameKey = translatedPathnameObj[0];
          console.log('test', existingPathnameKey)
          // console.log(routesObj)

          if (existingPathnameKey) {
            const translatedPathname = routesArray.map((route) => {
              const routePathnameKey = route[0];
              const routePathnameVal = route[1];
              return routePathnameKey === existingPathnameKey ? routePathnameVal : undefined;
            }).filter(f => f)[0];

            console.log('test2', translatedPathname)

            if (translatedPathname) {
              console.log('TEST', i18n.language, pathname, translatedPathname)
              if (!pathname.includes(translatedPathname)) {
                navigate(`/${translatedPathname}`, { replace: true });
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
  }, [appLanguage, i18n]); // i18n.language

  useEffect(() => {
    // if (lang) {
    //   const newRoutes = routesJSON[lang['id']];
    //   if (routes !== newRoutes) {
    //     setRoutes(newRoutes)
    //     if (lang['id'] !== 'et') {
    //       setTimeout(() => {
    //         setLang(ET)
    //       }, [4000])
    //     }
    //   }
    // }
    // if (appLanguage !== 'et') setTimeout(() => {
    //   setAppLanguage('et')
    // }, [4000])
  }, [appLanguage]); // lang, routes

  useEffect(() => {
    console.log('hello!', pathname);
    if (globalRoutes) {
      const a = Object.keys(globalRoutes).map((key) => [key, globalRoutes[key]]);
      let arr = [];
      a.forEach((key) => {
        Object.keys(key[1]).forEach(k => {
          arr.push({ key: k, value: key[1][k] });
        });
        // console.log(pathname.includes(key))
      });
      console.log(arr);
    }
  }, [pathname])

  const HomePage = () => {
    return (
      <>
        <h2 className='page-title'>{t('router.result.home')}</h2>
        <hr />
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
            // const images = jsonToObjArray(json2, []);

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
              // <div>
              //   {fields.map((field, key) => {
              //     return (
              //       <div key={key} style={{ paddingBottom: '2px' }}>
              //         {/* {field.key}:<br /> */}
              //         {/* {field.value}<br /> */}
              //       </div>
              //     )
              //   })}
              // </div>
            )
          }) : <h4>No Products :(</h4>}
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar config={config} />
      <main>
        <div className='container-main'>
          <div className='container'>
            <Routes>
              <Route path='/' element={<HomePage config={config} />} />
              {/* <Route path={'/' + routes['iphone']} element={<HomePage config={config} />} /> */}
              {/* <Route path={'/' + routes['ipad']} element={<HomePage config={config} />} /> */}
              {/* <Route path={'/' + lang['route']['login']} element={<LoginPage />} /> */}
            </Routes>
          </div>
        </div>
      </main>
    </>
  )
}

export default App;
