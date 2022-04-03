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


    const pathnames = location.pathname.split("/").filter(x => x);

  return (
    <div className="breadcrumb">
      <Link to={"/"}>Etusivu</Link>
      {pathnames.map((pname, index) => {
        let calcIndex = index + 1;
        const routeTo = `/${pathnames.slice(0,calcIndex + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        console.log(pname);
        return isLast ? (
          <span key={index}> {pname} </span>
        ) : (
          <Link key={index} to={routeTo}>{pname}</Link>
        )
      })}
    </div>
  )
}
