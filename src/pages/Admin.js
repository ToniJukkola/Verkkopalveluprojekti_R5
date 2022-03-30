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
                <Link className="btn btn-outline-dark" to={"/delete/"}>Poista tuote</Link>
            </ul>
            </div>
        </>
    );
}