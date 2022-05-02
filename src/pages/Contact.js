import React from "react";

export default function Contact() {
    return (
      <main className="container">
      <h1>Hei! Täällä Vihervajalla palautteesi on meille tärkeää. </h1>
      <h3>
          Kerro meille esimerkiksi tilauksestanne, 
          tai mahdollisesta parannuksesta, jonka haluaisit nähdä sivullamme.
      </h3>

      <form>
<div className="form-group">
<label htmlFor="inputName">Nimi</label>
<input type="text" className="form-control" id="inputName" placeholder="Nimi"/>
</div>
<div className="form-group">
<label htmlFor="exampleInputEmail1">Sähköposti</label>
<input type="email" className="form-control" id="inputEmail" placeholder="Syötä sähköposti"></input>
</div>
<div className="form-group">
<label htmlFor="exampleInputPassword1">Password</label>
<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
</div>
<div className="form-check">
<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
<label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
</div>
<button type="submit" className="btn btn-primary">Submit</button>
</form>
  </main>
    );
}
