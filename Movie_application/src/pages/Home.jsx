import MovieCard from "../components/MovieCard";
import {useState, useEffect} from "react";
import {getPopularMovies} from "../services/api";
import {searchMovies} from "../services/api";
import '../css/Home.css'
function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const loadPopularMovies = async() =>{
            try{
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            }catch(error){
                console.log(error);
                setError("Failed to load Movies......")
            }
            finally{
                setIsLoading(false);
            }
        }
        loadPopularMovies();
    },[])


    const handleSearch = async(e) => {
        e.preventDefault();
        if(!searchQuery.trim()) return
        if(isLoading) return;
        setIsLoading(true);
        try {
           const searchResults = await searchMovies(searchQuery);
           setMovies(searchResults);
           setError(null);
        } catch (error) {
            console.log(error);
            setError("Failed to search movies.....")
        }finally{
            setIsLoading(false);
        }
    }

    return <div className="home-container">
        <form onSubmit={handleSearch} className="search-form">
            <input type="text" 
            placeholder="Search for a movie....." 
            className="search-input" 
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {isLoading ? (
            <div className="loading-container">Loading...</div>
        ) : (
            <div className="movies-grid">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
        )}
    </div>
}

export default Home;