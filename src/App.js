import React, { useEffect, useState } from 'react'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import './App.css';
import { EN, ET, RU } from './lang/lang'
import Navbar from './components/Navbar';

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
  const [products, setProducts] = useState([
    {
      "fields": [
        { "Product code": "RAIDERGE78HX14VIG-639NL" },
        { "Name": "NOTEBOOK|MSI|RAIDER|RAIDER GE78 HX 14VIG|CPU CORE I9|I9-14900HX|2200  MHZ|17\"|2560X1600|RAM 32GB" },
        { "Manufacturer": "MSI" },
        { "Description": "Are you a true gamer? Do you want to be able to play the latest PC game  blockbusters of this year with high frame rates, mind blowing images and  immersive surround sound audio? The MSI Gaming notebooks are the best  weapon for you. Equipped with the MSI Gaming Notebooks will truly lift  your gaming spirits." },
        { "Vendor Homepage": "www.msi.com/Laptop/Raider-GE78-HX-14VX" },
        { "NB features": "Gaming" },
        { "Product line": "Consumer" },
        { "NB Family Name": "Raider" },
        { "Product model code": "Raider GE78 HX 14VIG" },
        { "CPU Family name": "Core i9" },
        { "CPU Model Number": "i9-14900HX" },
        { "Clock speed": "2200 MHz" },
        { "Chipset": "Intel HM770 Express" },
        { "Screen size": "17\"" },
        { "Native resolution": "2560x1600" },
        { "Screen type": "Non-Glare IPS" },
        { "Screen refresh rate": "240Hz" },
        { "Memory (RAM)": "32GB" },
        { "Max memory (RAM)": "96GB" },
        { "Memory slots": 2 },
        { "Memory type": "DDR5" },
        { "Frequency speed": "5600 MHz" },
        { "SSD Capacity": "2TB" },
        { "SSD type": "NVMe PCIe Gen4x4" },
        { "ODD type": "none" },
        { "Graphics controller": "Discrete" },
        { "VGA card": "NVIDIA GeForce RTX 4090" },
        { "Graphics memory": "16GB" },
        { "Integrated LAN": "2.5 Gigabit" },
        { "KB language": "ENG" },
        { "Keyboard backlight": "Yes" },
        { "Battery cells": "4 cells" },
        { "Audio-Out": 1 },
        { "HDMI": 1 },
        { "RJ45": 1 },
        { "USB 3.2": 2 },
        { "USB-C": 2 },
        { "USB-C w/Thunderbolt": 1 },
        { "Bluetooth": "Yes" },
        { "Wireless LAN": "802.11ax" },
        { "Card Reader": "SD" },
        { "Microphone": "Built-in" },
        { "Speakers": "Yes" },
        { "Built-in WebCam": "FHD IR" },
        { "Operating System": "Windows 11 Pro" },
        { "Colour": "Black" },
        { "Depth": "298 mm" },
        { "Height": "28.75 mm" },
        { "Width": "380 mm" },
        { "Unit Brutto Volume": "0.0207/0.0207 cubm" },
        { "Shipping box quantity": 1 },
        { "Unit Net Weight": "3.1 kg" },
        { "Unit Gross Weight": "6.15 kg" },
        { "CnCode": "84713000" },
        { "Full Description Line": "Windows 11 Pro" },
        { "Category Code": "NB" }
      ]
    }
  ]);

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
        <div style={{ marginTop: '20px' }}>
          {products && products.length > 0 ? products.map((product) => {
            const json = product['fields'];
            const fieldQuery = ['Product code'];
            const fields = jsonToObjArray(json, fieldQuery);

            return fields.map((field, key) => {
              return (
                <div key={key} style={{ paddingBottom: '20px' }}>
                  {field.value}<br />
                </div>
              )
            })
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
