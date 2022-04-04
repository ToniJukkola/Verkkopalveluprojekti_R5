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
        <main className="container">
            <h1>Tuotteiden lisääminen</h1>
            <Link className="p-3" to={"/admin/"}>&larr; Takaisin ylläpidon etusivulle</Link>
            <ul><br></br>
                <h4>Uusi tuote:</h4>
            </ul>
            <div className="mt-5 col-lg-6 col-sm">
            <ul>
                <textarea className="form-control" placeholder="Nimi"></textarea>
            </ul>
            <ul>
                <textarea className="form-control" placeholder="Kuvaus"></textarea>
            </ul>
            <ul>
                <textarea className="form-control" placeholder="Hoito-ohje"></textarea>
            </ul>
            <ul>
                <textarea className="form-control" placeholder="Tieteellinen nimi"></textarea>
            </ul>
            <ul>
                <input className="form-control" type="number" step="0.01" placeholder="Hinta"></input>
            </ul>
            <ul>
                <select>
                    {categories?.map(category => (
                        <option key={category.trnro}>{category.trnimi}
                        </option>))};
                </select>
            </ul>
            <ul>
                <button type="button" className="btn btn-outline-dark">Lisää uusi tuote</button>
            </ul>
           </div> 
        </main>
    );
}