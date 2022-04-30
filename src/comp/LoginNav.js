import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginNav({ token, setToken }) {
  function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    setToken("");
  }

  if (!token) {
    return (
      <>
        <Link className="bi bi-person-plus" to={"/rekisteroidy"} title="Rekisteröidy" ></Link>
        <Link className="bi bi-box-arrow-in-right" to={"/kirjaudu"} title="Kirjaudu sisään"></Link>
      </>
    )
  }
  return (
    <>
      <Link className="bi bi-x-circle" to={"/kirjaudu-ulos"} title="Kirjaudu ulos" onClick={logout}></Link>
      <Link className="bi bi-person-circle" to={"/"} title="Omat tiedot"></Link>
      <Link className="bi bi-gear" to={"/admin"} title="Admin-paneeli"></Link>
    </>
  )
}
