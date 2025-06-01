import '../css/Favourites.css'
import {useFavouriteContext} from '../context/FavouriteContext'
import MovieCard from '../components/MovieCard'
function Favourites(){

    const {favourites} = useFavouriteContext();
    if(favourites){

        return( 
        <div className="favourites">
            <h1>YourFavourite Movies</h1>
        <div className="movies-grid">
        {favourites.map(movie => (
            <MovieCard key={movie.id} movie={movie}/>
        ))}
        </div>
        </div>
        )
    }
    
    return <div className="favourite-empty">
        <h1>No favourite movies found</h1>
        <p>Add some movies to your favourites list</p>
    </div>

}
export default Favourites;