import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumb({url}) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  let location = useLocation();

  useEffect(() => {
    axios.get(url + "products/get_categories.php")
      .then((response) => {
        const json = response.data;
        setCategories(json);
      }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
  }, []);

  useEffect(() => {
    axios.get(url + "products/get_products-all.php")
        .then((response) => {
            setProducts(response.data);
        }).catch(error => {
            alert(error.response === undefined ? error : error.response.data.error);
        })
  }, [])

  // Tämä tarkistaa pitääkö polun näyttönimi hakea muualta vai riittääkö sen oma nimi
  function typeCheck(item,index,pname) {
    if(item === "tuotteet") {
      const nIndex = categories.findIndex(e => {
        return e.trnro == pname[1];
      })
      return categories[nIndex]?.trnimi;
    } else if (item === "tuote") {
      const nIndex = products.findIndex(e => {
        return e.tuotenro == pname[1];
      })
      
      return products[nIndex]?.tuotenimi;
    } else {
      return pname;
    }
  }
    // Otetaan nykyinen sijainti ja pilkotaan se taulukkoon
    const pathnames = location.pathname.split("/").filter(x => x);
    let newOrderPathnames = new Array();
    for (let index = 0; index < pathnames.length; index += 2) {
      newOrderPathnames[index] = new Array ( pathnames[index],pathnames[index + 1]);
    }

    // isLast tarkistaa onko kyseessä taulukon viimeinen polku. Jos polku on viimeinen, se esitetään tekstimuodossa. 
  return (
    <ol className="breadcrumb">
      <Link className='breadcrumb-item' to={"/"}>Etusivu</Link>
      {newOrderPathnames?.map((pname, index) => {
        const isLast = index === newOrderPathnames.length - 1;
        return isLast ? (
          <span className='breadcrumb-item active' key={index}> {typeCheck(pname[0], index, pname)} </span>
        ) : pname[0] === "tuotteet" || "tuote" ? (
          <Link className='breadcrumb-item' key={index} to={"/" + pname[0] + "/" + pname[1]}>{typeCheck(pname[0], index, pname)}</Link>
        ) : ("");
      })}
    </ol>
  )
}
