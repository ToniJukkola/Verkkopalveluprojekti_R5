import React from "react"
import { Link } from 'react-router-dom'

export default function Admin() {
    return (
        <>
        <div>
            <h1>Tervetuloa ylläpitäjä!</h1>
            <ul> 
               <Link className="btn btn-outline-dark" to={"/add/"}>Lisää tuote</Link>
            </ul>
           <ul> 
               <button type="button" className="btn btn-outline-dark">Poista tuote</button>
            </ul>
            </div>
        </>
    );
}