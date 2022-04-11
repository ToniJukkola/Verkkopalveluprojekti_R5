import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function AddCategory({ url }) {
  const [categories, setCategories] = useState([]);
  const [newCategory, setnewCategory] = useState([]);

  useEffect(() => {
    axios.get(url + "products/get_categories.php")
      .then((response) => {
        setCategories(response.data);
      }).catch(error => {
        alert(error.response === undefined ? error : error.response.data.error);
      })
  }, [])

  function AddTrnimi(e) {
    e.preventDefault();
    const json = JSON.stringify({ trnimi: newCategory });
    axios.post(url + 'admin/add_category.php', json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        setnewCategory(newCategory => [...newCategory, response.data]);
        setnewCategory('');
        axios.get(url + "products/get_categories.php")
          .then((response) => {
            setCategories(response.data);
          }).catch(error => {
            alert(error.response === undefined ? error : error.response.data.error);
          })
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      })
  }

  function deleteCategory(trnro) {
    const json = JSON.stringify({ trnro: trnro });
    axios.post(url + "admin/delete_category.php", json, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        const newCategoryList = categories.filter((category) => category.trnro !== trnro);
        setCategories(newCategoryList);
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      });
  }

  return (
    <main className="container">
      <h1>Tuoteryhmien hallinta</h1>
      <Link className="p-3" to={"/admin/"}>&larr; Takaisin ylläpidon etusivulle</Link>
      <div className="mt-5 col-lg-6 col-sm">
        <form className="mb-5" onSubmit={AddTrnimi}>
            <h4>Uusi tuoteryhmä:</h4>
            <input className="form-control" value={newCategory} placeholder="Uusi tuoteryhmä" type="text" onChange={e => setnewCategory(e.target.value)} />
            <button type="submit" className="mt-3 btn btn-outline-dark" name="newnewCategory">Lisää uusi tuoteryhmä</button>
        </form>

        <h4>Poista tuoteryhmä</h4>
        <ul className="list-group">
          {categories?.map(category => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={category.trnro}>{category.trnimi} <button className="btn btn-dark p-1 m-2" onClick={() => deleteCategory(category.trnro)}>Poista</button></li>
          ))}
        </ul>
      </div>
    </main>
  );
}