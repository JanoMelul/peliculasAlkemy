import { Redirect, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios  from 'axios'
import swAlert from '@sweetalert/with-react';


function Listado(props) {
  let token = sessionStorage.getItem('token')

  const [moviesList, setMoviesList] = useState([])

  useEffect(() => {
    const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=6cd9b283d5174facb4e3981ccb357ed2&language=es-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
    axios.get(endPoint)
      .then(res => {
        const apiData = res.data
        setMoviesList(apiData.results)
      })
      .catch(error => {
        swAlert(
          <h2>Hubo errores, intenta más tarde</h2>
        )
      })
  }, [setMoviesList]);

  return (
    <div className='container mt-4'>
    {!token && <Redirect to='/' />}

    <div className='row'>
      
      {
      moviesList.map((movies) =>{
        return (
          <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12 my-4'  key={movies.id}>
         <div className="card " >
         <img className="card-img-top" src={'https://image.tmdb.org/t/p/w500' + movies.poster_path} alt="Card cap" />
         <button onClick={props.addOrRemoveFromFavs} data-movie-id={movies.id} className='favourite-btn'>🖤</button>
           <div className="card-body">
             <h5 className="card-title">{ movies.title.substring(0,30)
             }...</h5>
             <p className="card-text">{movies.overview.substring(0,100)}...</p>
             <Link to={`/detalle?movieID=${movies.id}`} className="btn btn-primary">Ver detalle</Link>
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

export default Listado