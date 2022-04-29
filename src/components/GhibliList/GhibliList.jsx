import React from 'react'
import styles from '../Home/Home.css'

export default function GhibliList({ movies }) {
  return (
      movies.map((movie, i) => {
          return (
              <div className={styles['movie']}>
                <h2>Title: {movie.title}</h2>
                <h3>Original Title: {movie.originalTitle}</h3>
                <img src={movie.image} alt='movie poster' height='400px' /> 
                <h4>Director: {movie.director}</h4>
                <p>Release Date: {movie.releaseDate}</p>
                <p>Description: {movie.description}</p>
            </div>
        )
    })
  )
}
