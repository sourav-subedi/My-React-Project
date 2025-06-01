const API_KEY = "e452146c4f195587f77d397e677e2c21";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async() =>{
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

export const searchMovies = async(querry) =>{
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(querry)}`);
    const data = await response.json();
    return data.results;
}