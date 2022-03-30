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
                    <h4>Uusi tuote:</h4>
                </ul>
                <ul>
                    <textarea placeholder="Nimi"></textarea>
                </ul>
                <ul>
                    <textarea type="textarea" placeholder="Kuvaus"></textarea>
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
                    <button type="button" className="btn btn-outline-dark">Lisää uusi tuote</button>
                </ul>
        </>
    );
}