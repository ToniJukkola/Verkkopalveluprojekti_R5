import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


    
    export default function AddCategory({ url }) {
        const [categories, setCategories] = useState([]);
        useEffect(() => {
            axios.get(url + "products/get_categories.php")
                .then((response) => {
                    setCategories(response.data);
                }).catch(error => {
                    alert(error.response === undefined ? error : error.response.data.error);
                })
        }, [])

    return (
        <>
            <h1>Tuotteiden lisääminen</h1>
            <ul> 
               <Link className="btn btn-outline-dark" to={"/add/"}>Lisää tuote</Link>
            </ul>
           <ul> 
                <Link className="btn btn-outline-dark" to={"/delete/"}>Poista tuote</Link>
            </ul>
            <ul> 
                <Link className="btn btn-outline-dark" to={"/addcategory/"}>Lisää tuoteryhmä</Link>
            </ul>
            <br></br>
                <ul>
                    <h4>Uusi tuote:</h4>
                </ul>
                <ul>
                    <textarea placeholder="Nimi"></textarea>
                </ul>
                <ul>
                    <textarea placeholder="Kuvaus"></textarea>
                </ul>
                <ul>
                    <textarea placeholder="Hoito-ohje"></textarea>
                </ul>
                <ul>
                    <textarea placeholder="Tieteellinen nimi"></textarea>
                </ul>
                <ul>
                    <input type="number" step="0.01" placeholder="Hinta"></input>
                </ul>
                <ul>
                    <select placeholder="Kategoria">
                    {categories?.map(category => (
                    <option key={category.trnro}>{category.trnimi}
                        </option>))};
                        
                    </select>
                </ul>
                <ul>
                    <button type="button" className="btn btn-outline-dark">Lisää uusi tuote</button>
                </ul>
        </>
    );
}