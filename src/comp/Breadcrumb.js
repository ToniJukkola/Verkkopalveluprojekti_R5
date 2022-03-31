import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Breadcrumb({url}) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  let params = useParams();

  useEffect(() => {
    axios.get(url + "products/get_categories.php")
      .then((response) => {
        const json = response.data;
        console.log(params);
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

  useEffect(() => {
    console.log(params);
    }, [params])

  return (
    <div className="breadcrumb">
      {categories[params.categoryID]?.trnimi}
    </div>
  )
}
