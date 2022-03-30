import React from "react";

export default function Add() {
    return (
        <>
            <h1>Tuotteiden lisääminen</h1>
            <ul> 
               <button type="button" className="btn btn-outline-dark">Lisää tuote</button>
            </ul>
           <ul> 
               <button type="button" className="btn btn-outline-dark">Poista tuote</button>
            </ul><br></br>
                <ul>
                    <label>Uusi tuote:</label>
                </ul>
                    <ul>
                        <input placeholder="Nimi"></input>
                    </ul>
                        <ul>
                            <input type="number" step="0.01" placeholder="Hinta"></input>
                        </ul>
                            <ul>
                                <input type="text" placeholder="Kuvaus"></input>
                            </ul>
                                <ul>
                                    <input placeholder="Hoito-ohje"></input>
                                </ul>
                                    <ul>
                                        <input placeholder="Tieteellinen nimi"></input>
                                    </ul>
                        
                
        </>
    );
}