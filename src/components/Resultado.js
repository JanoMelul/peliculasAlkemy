import { useEffect, useState } from 'react'
import {Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import swAlert from '@sweetalert/with-react';


function Resultados(props) {
  let token = sessionStorage.getItem('token')

  let query = new URLSearchParams(window.location.search)
  let keyword = query.get('keyword')

  const [movieResults, setMovieResults] = useState([])

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=6cd9b283d5174facb4e3981ccb357ed2&language=es-ES&query=${keyword}`

    axios.get(endPoint).then(response => {
      const moviesArray = response.data.results;
   
      if(moviesArray.length === 0 ){
        swAlert(
          <h4>Tu busqueda no obtuvo resultados</h4>
        )
      }

      setMovieResults(moviesArray)
    })
    .catch(error =>{
      swAlert(
        <h2>Hubo errores, intenta más tarde</h2>
      ) 
    })
  }, [keyword])


//


  return (
    <div className='container mt-4'>
    {!token && <Redirect to='/' />}
    <h2>Resultados obtenidos: {keyword}</h2>
    {movieResults.length === 0 && <h5>No hay resultados</h5>}

    <div className='row'>
      
      {
      movieResults.map((movies) =>{
        return (
          <div className='col-lg-4 col-md-4 col-sm-6 col-xs-12 my-4'>
         <div className="card " key={movies.id} >
         <img className="card-img-top" src={'https://image.tmdb.org/t/p/w500' + movies.poster_path} alt="Card cap" />
         <button onClick={props.addOrRemoveFromFavs} data-movie-id={movies.id} className='favourite-btn'>🖤</button>
           <div className="card-body">
             <h5 className="card-title">{ movies.title.substring(0,30)
             }...</h5>
             <p className="card-text">{movies.overview.substring(0,100)}...</p>
             <Link to={`/detalle?movieID=${movies.id}`} className="btn btn-primary">View detail</Link>
           </div>
       </div>
       </div>
       )
      })
      }
    </div>
    
    </div>
  )
}

export default Resultados;