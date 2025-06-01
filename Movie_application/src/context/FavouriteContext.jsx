import {createContext, useState, useContext, useEffect} from "react";

const FavouriteContext = createContext();

export const useFavouriteContext = () => useContext(FavouriteContext);

export const MovieProvider = ({children}) => {
    const [favourites, setFavourites] = useState([]);

    useEffect(()=>{
        const storedFavourites = localStorage.getItem("favourites");
        if(storedFavourites){
            setFavourites(JSON.parse(storedFavourites));
        }
    },[]);

    useEffect(()=>{
        localStorage.setItem("favourites", JSON.stringify(favourites));
    },[favourites]);


    const addToFavourites = (movie) => {
        setFavourites(prevFavourites => [...prevFavourites, movie]);
    }

    const removeFromFavourites = (movieId) => {
        setFavourites(prevFavourites => prevFavourites.filter(movie => movie.id !== movieId));
    }

    const isFavourite = (movieId) => {
        return favourites.some(movie => movie.id === movieId);
    }

    const value = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite
    }

    return <FavouriteContext.Provider value={value}>
        {children}
    </FavouriteContext.Provider>
}
