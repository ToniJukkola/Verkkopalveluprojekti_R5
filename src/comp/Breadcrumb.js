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

  function typeCheck(item,index,pname) {

    if(item === "tuotteet") {
      return categories[(newOrderPathnames[index][1])-1]?.trnimi;
    } else if (item === "tuote") {
      return products[(newOrderPathnames[index][1])-1]?.tuotenimi;
    } else {
      return pname;
    }
    
  }

    const pathnames = location.pathname.split("/").filter(x => x);
    let newOrderPathnames = new Array();
    for (let index = 0; index < pathnames.length; index += 2) {
      newOrderPathnames[index] = new Array ( pathnames[index],pathnames[index + 1])
    }
  return (
    <div className="breadcrumb">
      <Link to={"/"}>Etusivu</Link>
      {newOrderPathnames?.map((pname, index) => {
        const isLast = index === newOrderPathnames.length - 1;
        return isLast ? (
          <span key={index}> {typeCheck(pname[0],index,pname)} </span>
        ) : pname[0] === "tuotteet" || "tuote" ? (
          <Link key={index} to={"/" + pname[0] + "/" + pname[1]}>{typeCheck(pname[0],index ,pname)}</Link>
        ) : ("");
      })}
    </div>
  )
}
