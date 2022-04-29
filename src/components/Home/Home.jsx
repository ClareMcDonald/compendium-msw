import { useEffect, useState } from 'react';
import GhibliList from '../GhibliList/GhibliList';
import styles from './Home.css'

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [searchedMovies, setSearchedMovies] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();

        if (search) {
            const filteredMovies = movies.filter(movie => movie.title.includes(search));
            //add toLowerCase
            console.log(filteredMovies);
            setSearchedMovies(filteredMovies);
        }
    }
    
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
        
        : (<>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type='text' placeholder='search' value={search} onChange={e => setSearch(e.target.value)}></input>
                </label>
                <label>
                <button>Submit</button>
                </label>
            </form>
            <h1>Studio Ghibli Movies</h1>
            {
                searchedMovies.length
                    ? <div className={styles['list']}>{<GhibliList movies={searchedMovies} />}</div>
                    : <div className={styles['list']}>{<GhibliList movies={movies} />}</div>
            }
            </>
  )
}
