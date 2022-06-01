import { Link, Redirect} from 'react-router-dom'

function Favoritos(props) {
  let token = sessionStorage.getItem('token')

  return (
    <div className='container mt-4'>
      {!token && <Redirect to='/' />}
    <h2>Favoritos</h2>
    <div className='row'>
      {!props.favorites.length && <h5 className='text-danger'>No tenes nada en favoritos</h5>}
      {
      props.favorites.map((movies) =>{
        return (
          <div className='col-lg-3 col-md-4 col-sm-6 col-xs-12 my-4'  key={movies.id}>
         <div className="card " >
         <img className="card-img-top" src={'https://image.tmdb.org/t/p/w500' + movies.imgURL} alt="Card cap" />
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

export default Favoritos;