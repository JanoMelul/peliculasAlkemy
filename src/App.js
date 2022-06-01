//Libraries
import {useState, useEffect} from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
import Listado from './components/Listado';
import Login from './components/Login';
import Header from './components/Header'
import Footer from './components/Footer'
import Detalle from './components/Detalle'
import Resultados from './components/Resultado';
import Favoritos from './components/Favoritos';

// Styles
import './css/bootstrap.min.css'
import './css/App.css'

function App() {
  const [ favorites, setFavorites ] = useState([]) 

  useEffect(() =>{
    const favsInLocal = localStorage.getItem('favs')

    if (favsInLocal !== null){
      const favsArray = JSON.parse(favsInLocal)
      setFavorites(favsArray)
    }
  }, [])


  const addOrRemoveFromFavs = e =>{
    const favMovies = localStorage.getItem('favs')

    let  tempMoviesInFavs;
  
    if (favMovies === null){
      tempMoviesInFavs = []
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieData = {
      imgURL, title, overview,
      id: btn.dataset.movieId
    };

    let movieIsInArray = tempMoviesInFavs.find(oneMovie => {
      return oneMovie.id === movieData.id
    });

    if (!movieIsInArray){
    tempMoviesInFavs.push(movieData);
    localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
    setFavorites(tempMoviesInFavs)

  } else {
      let moviesLeft = tempMoviesInFavs.filter(oneMovie =>{
        return oneMovie.id !== movieData.id
    });
      localStorage.setItem('favs', JSON.stringify(moviesLeft))
      setFavorites(moviesLeft)
  }



}

  return (
    <div className='min-vh-100'>
    <Header favorites={favorites}/>

      <Switch>
        <Route exact={true} path="/" component={Login}/>
        <Route path="/listado" render={(props) => <Listado addOrRemoveFromFavs={addOrRemoveFromFavs} {...props}/>}/>
        <Route path='/detalle' render={(props) => <Detalle addOrRemoveFromFavs={addOrRemoveFromFavs} {...props}/>}/>
        <Route path='/resultados' render={(props) => <Resultados addOrRemoveFromFavs={addOrRemoveFromFavs} {...props}/>}/>
        <Route path='/favoritos' render={(props) => <Favoritos addOrRemoveFromFavs={addOrRemoveFromFavs} favorites={favorites} {...props}/>}/>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
