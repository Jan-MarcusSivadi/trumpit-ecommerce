import React, { useEffect, useState } from 'react'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import './App.css';
import { EN, ET, RU } from './lang/lang'
import Navbar from './components/Navbar';
import productsData from './db/products.json'

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
  const [lang, setLang] = useState(EN);
  const [products, setProducts] = useState(productsData);

  const config = { lang, setLang, products, setProducts };

  useEffect(() => {
    // setLang(EN);
    if (products && products.length > 0) {
      // console.log(products.map(prod => prod['fields']))
    }
  }, [])

  const HomePage = () => {
    return (
      <>
        <h2>{lang['route_result']['home']}</h2>
        <div>

        </div>
      </>
    )
  }
  const ProductsPage = ({ config }) => {
    const { products, setProducts } = config;

    return (
      <>
        <h2>{lang['route_result']['products']}</h2>
        <div>
          <hr />
          {products && products.length > 0 ? products.map((product) => {
            const json = product['fields'];
            const fieldQuery = ['Product code'];
            const fields = jsonToObjArray(json, fieldQuery);

            return (
              <div>
                {fields.map((field, key) => {
                  return (
                    <div key={key} style={{ paddingBottom: '2px' }}>
                      {/* {field.key}:<br /> */}
                      {field.value}<br />
                    </div>
                  )
                })}
              </div>
            )
          }) : <h4>No Products :(</h4>}
        </div>
      </>
    )
  }
  const AboutPage = () => {
    return (
      <><h2>{lang['route_result']['about']}</h2></>
    )
  }
  const LoginPage = () => {
    return (
      <><h2>{lang['route_result']['login']}</h2></>
    )
  }

  return (
    <BrowserRouter>
      <Navbar config={config} />
      <div className='container-main'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path={'/' + lang['route']['products']} element={<ProductsPage config={config} />} />
            <Route path={'/' + lang['route']['about']} element={<AboutPage />} />
            <Route path={'/' + lang['route']['login']} element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
