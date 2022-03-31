import React from "react";
import { Link } from 'react-router-dom'

export default function AddCategory() {
    return (
        <>
            <h1>Kategorioiden lisääminen</h1>
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
        </>
        );
    }