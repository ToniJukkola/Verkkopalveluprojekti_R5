import React from "react"
import { Link } from 'react-router-dom'

export default function Admin() {
    return (
        <main className="container">
            <div>
                <h1>Tervetuloa ylläpitäjä!</h1>

                <div className="d-grid gap-3 justify-content-start">
                    <Link className="btn btn-outline-dark" to={"/admin/addproduct/"}>Lisää tuote</Link>
                <Link className="btn btn-outline-dark" to={"/admin/edit/"}>Tuotteiden hallinta</Link>

                    <Link className="btn btn-outline-dark" to={"/admin/addcategory/"}>Tuoteryhmien hallinta</Link>
                </div>
            </div>
        </main>
    );
}