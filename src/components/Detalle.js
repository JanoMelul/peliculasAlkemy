import { Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import swAlert from '@sweetalert/with-react';

function Detalle(props) { 

  const [movie, setMovie] = useState(null)

  let token = sessionStorage.getItem('token')

  let query = new URLSearchParams(window.location.search)
  let movieID = query.get('movieID')

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=6cd9b283d5174facb4e3981ccb357ed2&language=es-ES`

    axios.get(endPoint).then(response => {
      const movieData = response.data
      setMovie(movieData)
    })
    .catch(error =>{
      swAlert(
        <h2>Hubo errores, intenta más tarde</h2>
      ) 
    })
  }, [movieID])
  return (
    <div className='container mt-4'>
    {!token && <Redirect to='/' />}
    { !movie && <p>Cargando...</p>}
    { movie && 
    (<>
    <h2> Titulo: {movie.title}</h2>
    <div className='row'>
      <div className='col-4'>
      <img className="img-fluid" src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt="Card cap" />
      </div>
      <div className='col-8'>

        <h5>Fecha de estreno: { movie.release_date }</h5>
        <h5>Reseña: </h5>
        <p>{ movie.overview }</p>
        <p>Raiting: {movie.vote_average}</p>
        <p>Géneros:</p>
        <ul>
          {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
        </ul>
      </div>
    </div>
    </>)}
    </div>
  )
}

export default Detalle;