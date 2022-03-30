import React from "react";

export default function Admin() {
    return (
        <>
            <h1>Tervetuloa ylläpitäjä!</h1>
            <ul> 
               <button type="button" className="btn btn-dark">Lisää tuote</button>
            </ul>
           <ul> 
               <button type="button" className="btn btn-dark">Poista tuote</button>
            </ul>
        </>
    );
}