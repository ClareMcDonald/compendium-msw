import { useEffect, useState } from 'react';
import GhibliList from '../GhibliList/GhibliList';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [searchedMovies, setSearchedMovies] = useState([]);


    useEffect(() => {
        async function getMovies() {
            const res = await fetch('https://ghibliapi.herokuapp.com/films');
            const json = await res.json();
            const movies = json.map((movie) => ({
                image: movie.image,
                title: movie.title,
                originalTitle: movie.original_title,
                director: movie.director,
                releaseDate: movie.release_date,
                description: movie.description
            }));
            setMovies(movies);
            setLoading(false);
        }
        getMovies();
    }, []);

    return loading
        ? <h1>📽 Loading Movies 📽</h1>
        
        : ( <>
                <h1>Studio Ghibli Movies</h1>
                <div>{<GhibliList movies={movies} />}</div>
            </>
  )
}
