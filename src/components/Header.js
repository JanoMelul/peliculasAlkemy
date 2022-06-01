import { Link } from 'react-router-dom'

//components
import Buscador from './Buscador'

function Header(props)  {
  return(
    <header className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <nav className='container'>
        <Link className='navbar-brand' to='/'>AlkeFlix</Link>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='nav-bar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
        <ul  className='navbar-nav '>
          <li className='nav-item'>
            <Link to='/' className='nav-link'>Home</Link> 
          </li>
          <li className='nav-item'>
            <Link to='/listado' className='nav-link'>Listado</Link>
          </li>
          <li className='nav-item'>
            <Link to='/favoritos' className='nav-link'>Favoritos</Link>
          </li>
          <li className='nav-item d-flex align-items-center'>
          {props.favorites.length > 0 && <span className='text-primary'>Peliculas en Favoritos: {props.favorites.length}</span>}
          </li>
        </ul>
        </div>
        <Buscador />
      </nav>
    </header>
  )
}

export default Header