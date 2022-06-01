import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { Redirect, useHistory } from 'react-router-dom'

function Login() {
  const history = useHistory()

  let token = sessionStorage.getItem('token')

  const submitHandler = e =>{
    e.preventDefault()
    
    const email = e.target.email.value;
    const password= e.target.password.value;

    const regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    
    
    
    if(email === '' || password === ''){
      swAlert(
      <h2>Los campos  no pueden estar vacíos</h2>
      )
      return;
    }

    if(email !== '' && !regexEmail.test(email)){
      swAlert(
        <h2>Debes escribir una dirección de correo electrónico válida</h2>
        )
      return;
    }

    if(email !== 'challenge@alkemy.org' || password !== 'react'){
      swAlert(
        <h2>Credenciales inválidas</h2>
        )
      return;
    }

    axios
      .post('http://challenge-react.alkemy.org', { email, password })
      .then(res => {
        swAlert(
          <h2>Ingresaste correctamente</h2>
          )
        const tokenRecibido = res.data.token
        sessionStorage.setItem('token', tokenRecibido);
        history.push('/listado')
      })
      
  }
    return (
      <div className='container mt-4'>
      { token && <Redirect to='/listado' />}
      <div className='row'>
        <div className='col-6 offset-3'>
      <h2>Formulario de Login</h2>
        <form onSubmit={submitHandler}>
          <label className='fomr-label d-block mt-2'>
            <span>Corre electronico:</span>  <br/>
            <input className='form-control' type="text" name="email" />
            </label>
            <br/>
            <label className='fomr-label d-block mt-2'>
            <span>Contraseña:</span>  <br/>
            <input className='form-control' type="password" name="password" />
            </label>
            <br/>
            <button className='btn btn-primary mt-2' type="submit">Ingresar</button>
        </form>
        </div>
        </div>
        </div>
    )
}

export default Login;