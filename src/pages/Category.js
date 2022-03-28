import React from "react";

export default function Category(props) {

    return (
        <>

            <ul>
            {props.productList?.map(e => (
                <li key={e.tuotenro}>{e.tuotenimi} {e.tuotekuvaus}</li>
            ))}
            </ul>
        </>
    );
}