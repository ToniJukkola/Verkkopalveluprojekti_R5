import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function AddCategory({ url }) {
    const [categories, setCategories] = useState([]);
    const [tuoteryhma, setTuoteryhma] = useState([]);

        
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
            const json = JSON.stringify({trnimi:tuoteryhma});
            axios.post(url + 'add/add_category.php',json, {
              headers: {
                'Content-Type' : 'application/json'
              }
            })
            .then((response) => {
              setTuoteryhma(tuoteryhma => [...tuoteryhma,response.data]);
              setTuoteryhma('');
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
                <Link className="btn btn-outline-dark" to={"/admin/addcategory/"}>Lisää tuoteryhmä</Link>
            </ul>
            <br></br>
            <form onSubmit={AddTrnimi}>
                <ul>
                    <h4>Uusi tuoteryhmä:</h4>
                 </ul> 
                <ul>
                    <textarea value={tuoteryhma} placeholder="Uusi tuoteryhmä" type="text" onChange={e => setTuoteryhma(e.target.value)}></textarea>
                </ul>
                <ul>
                    <button type="submit" className="btn btn-outline-dark" name="newcategory">Lisää uusi tuoteryhmä</button>
                </ul>
                <ul>
                   {categories?.map(category =>(
                     <li key={category.trnro}>{category.trnimi}</li>
                   ))}
                 </ul>
            </form>
        </main>
        );
    }