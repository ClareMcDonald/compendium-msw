import { useEffect, useState } from 'react';

export default function GhibliList() {
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
            }))
            console.log(movies);
        }
        getMovies();
    }, []);

  return (
    <div>GhibliList</div>
  )
}
