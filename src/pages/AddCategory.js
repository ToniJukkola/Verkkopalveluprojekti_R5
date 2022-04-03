import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function AddnewCategory({ url }) {
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
            const json = JSON.stringify({trnimi:newCategory});
            axios.post(url + 'add/add_category.php',json, {
              headers: {
                'Content-Type' : 'application/json'
              }
            })
            .then((response) => {
              setnewCategory(newCategory => [...newCategory,response.data]);
              setnewCategory('');
            }).catch(error => {
              alert(error.response ? error.response.data.error : error);
            })
          }
    
    return (
        <main className="container">
            <h1>Tuoteryhmien lisääminen</h1>
            <ul> 
               <Link className="btn btn-outline-dark" to={"/admin/addproduct/"}>Lisää tuote</Link>
            </ul>
           <ul> 
                <Link className="btn btn-outline-dark" to={"/admin/delete/"}>Poista tuote</Link>
            </ul>
            <ul> 
                <Link className="btn btn-outline-dark" to={"/admin/addnewCategory/"}>Lisää tuoteryhmä</Link>
            </ul>
            <br></br>
            <form onSubmit={AddTrnimi}>
                <ul>
                    <h4>Uusi tuoteryhmä:</h4>
                 </ul> 
                <ul>
                    <input className="form-control" value={newCategory} placeholder="Uusi tuoteryhmä" type="text" onChange={e => setnewCategory(e.target.value)} />
                </ul>
                <ul>
                    <button type="submit" className="btn btn-outline-dark" name="newnewCategory">Lisää uusi tuoteryhmä</button>
                </ul>
            </form>
            <ul>
                   {categories?.map(newCategory =>(
                     <li key={newCategory.trnro}>{newCategory.trnimi}</li>
                   ))}
                 </ul>
        </main>
        );
    }