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
<label htmlFor="InputEmail1">Sähköposti</label>
<input type="email" className="form-control" id="inputEmail" placeholder="Syötä sähköposti"></input>
</div>
<div className="form-group">
<label htmlFor="InputInfo">Viesti</label>
<input type="text" className="form-control" id="InputInfo" placeholder="Syötä viesti"/>
</div>

<button type="submit" className="btn btn-primary">Lähetä</button>
</form>
  </main>
    );
}
