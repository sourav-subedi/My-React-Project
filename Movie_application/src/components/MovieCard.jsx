import '../css/MovieCard.css'
import {useFavouriteContext} from '../context/FavouriteContext'

function MovieCard({movie}){
    const {isFavourite, addToFavourites, removeFromFavourites} = useFavouriteContext();
    const favourite = isFavourite(movie.id)
    
    function onFavouriteClick(e){
        e.preventDefault();
        if(favourite){
            removeFromFavourites(movie.id);
        }else{
            addToFavourites(movie);
        }
    }

    const posterUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image+Available';

    return<div className="movie-card">
            <div className="movie-poster">
                <img src={posterUrl} alt={movie.title} />
                <div className="movie-overlay">
                    <button className={`favourite-button ${favourite ? "active" : ""}` }onClick={onFavouriteClick}>♥</button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>

}

export default MovieCard;