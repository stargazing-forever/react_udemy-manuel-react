import React, { useState } from "react";
import { auth } from "../firebaseconfig";
import { useHistory } from "react-router-dom";

const Login = () => {
  const historial = useHistory();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msgError, setMsgError] = useState(null);

  const registrarUsuario = (e) => {
    e.preventDefault();
    console.log("gaaaaa!");

    auth.createUserWithEmailAndPassword(email, pass)
      .then((res) => {
            historial.push('/')
      })
      .catch( e => {
        if (e.code == "auth/invalid-email") {
          setMsgError("Formato de email incorrecto");
        }
        if (e.code == "auth/weak-password") {
          setMsgError("Contraseña debil");
        }
      })

    //auth/invalid-email
    //auth/weak-password

    
  };

  const loginUsuario = (e) => {
      auth.signInWithEmailAndPassword(email, pass)
      .then( res => {
          historial.push('/')
      })
      .catch( err => {
          console.log(err);
          if (err.code == "auth/invalid-email") {
            setMsgError("Formato de email incorrecto");
          }
          if(err.code == 'auth/user-not-found'){
              setMsgError('Usuario no registrado')
          }
          if(err.code == 'auth/wrong-password'){
              setMsgError('Contraseña incorrecta')
          }
      })
  }
  //auth/user-not-found
  //auth/wrong-password

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <form onSubmit={registrarUsuario}>
            <input
              className="form-control"
              type="email"
              placeholder="Introduce el email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
            />
            <input
              className="form-control mt-4"
              type="password"
              placeholder="Introduce la password"
              name="password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <input
              className="btn btn-dark btn-block mt-4"
              type="submit"
              value="Registrar"
            />
          </form>

          <button 
            onClick={loginUsuario}
            className="btn btn-success btn-block"
        >Iniciar Sesión
            </button>
            {msgError != null ? <div>{msgError}</div> : <span></span>}
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default Login;
