import React from "react"
import axios from "axios";
import { Link } from 'react-router-dom'

export default function AddCategory() {
    return (
        <main className="container">
            <h1>Kategorioiden lisääminen</h1>
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
            <ul>
                    <h4>Uusi tuoteryhmä:</h4>
                </ul>
                <ul>
                    <textarea placeholder="Tuoteryhmän nimi"></textarea>
                </ul>
                <ul>
                    <button type="button" className="btn btn-outline-dark" name="newcategory">Lisää uusi tuoteryhmä</button>
                </ul>
        </main>
        );
    }