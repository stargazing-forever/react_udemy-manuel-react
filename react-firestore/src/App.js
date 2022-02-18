import React,{useState, useEffect} from 'react';
import {store} from './utils/FirebaseConfig'

function App() {
  const [nombre, setNombre] = useState('');
  const [phone, setPhone] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [msgError, setmsgError] = useState(null);
  const [identificador, setIdentificador] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);

  //useEffects
  useEffect( () => {
    getUsuarios();
  },[])

  //functions
  const submitUsuario = async(e) =>  {
    e.preventDefault();
    if(!nombre.trim()){
      setmsgError('El campo nombre esta vacío!');
      return;
    }
    if(!phone.trim()){
      setmsgError('El campo teléfono esta vacío!');
      return;
    }
    //datos

    const usuario= {
      nombre:nombre,
      telefono:phone
    }

    try {

      const data = await store.collection('agenda').add(usuario);
      getUsuarios();
      alert('Contacto añadido');
      setNombre('');
      setPhone('');
    } catch (err) {
      console.log(err);
      
    }
  }

  const getUsuarios = async() => {
    const{docs} = await store.collection('agenda').get();
    const newArray = docs.map( item => ({
      id:item.id,
      ...item.data()
    }));
    setUsuarios(newArray);
  }

  const borrarUsuario = async(id) => {
    try {
      await store.collection('agenda').doc(id).delete();
      alert('Contacto Borrado');
      getUsuarios();
    } catch (err) {
      console.log(err)
    }
  }

  const updateUser = async(id) => {
    try {
      const data = await store.collection('agenda').doc(id).get();
      const {nombre, telefono} = data.data();
      setNombre(nombre);
      setPhone(telefono);
      setIdentificador(id);
      setModoEdicion(true);
      console.log(id);

    } catch (err) {
      console.log(err)
    }
  }

  const submitUpdateUser = async(e) => {
    e.preventDefault();
    if(!nombre.trim()){
      setmsgError('El campo nombre esta vacío!');
      return;
    }
    if(!phone.trim()){
      setmsgError('El campo teléfono esta vacío!');
      return;
    }
    const userUpdate = {
      nombre:nombre,
      telefono:phone
    }
    try {
      await store.collection('agenda').doc(identificador).set(userUpdate);
      getUsuarios();
      alert('Contacto Actualizado')
      setModoEdicion(false);
      setNombre('');
      setPhone('');
      setIdentificador('');
    } catch (err) {
      console.log(err);
    }
    console.log('actualizando usuario');
  }



  return (
    <div>
      <div className="container">
        <div className="row">
          {/* FORMULARIO */}
          <div className="col text-center">
            <h2>Formulario de Usuarios</h2>
            <form 
              onSubmit={!modoEdicion?submitUsuario:submitUpdateUser} 
              className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Introduce el nombre"
                onChange={e => setNombre(e.target.value)}
                value={nombre}
              />
              <input
                className="form-control mt-3"
                type="number"
                placeholder="Introduce el numero"
                onChange={e => setPhone(e.target.value)}
                value={phone}
              />

              <div className="d-grid gap-2">
                <input
                  className="btn btn-dark mt-3"
                  type="submit"
                  value={(!modoEdicion?'Registrar':'Actualizar')}
                />
              </div>
            </form>
            {
              (msgError != null)?
              (
                <div className="alert alert-warning" role="alert">
                  {msgError}
                </div>
              ):
              (<span></span>)
            }
          </div>

          {/* LISTA */}
          <div className="col">
            <h2 className="text-center">Lista de tu Agenda</h2>
            {
              usuarios.length !== 0 ?
              (
                <ul className="list-group">
                  {usuarios.map( user => (
                    <li className="list-group-item" key={user.id}>
                      {user.nombre}, {user.telefono}
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button 
                          className="btn btn-info" 
                          type="button"
                          onClick={() => updateUser(user.id)}
                        >Editar</button>
                        <button 
                          type="button" 
                          className="btn btn-danger" 
                          onClick={()=>borrarUsuario(user.id)}
                        >Eliminar</button>
                      </div>
                      
                    </li>
                  ))}
                </ul>
              ):
              (<span>Agenda Vacía</span>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
