import { useState } from "react";

const BuscadorPeliculas = () => {

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = '77e8225dd896a51a7196847600048f26'

    const [searchMovie, setSearchMovie] = useState('')
    const [movies, setMovies] = useState([])

    const handleInputChange = (e) => {
        setSearchMovie(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchMovies()
    }

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${searchMovie}&api_key=${API_KEY}`)
            const data = await response.json()
            setMovies(data.results)
        } catch (error) {
            console.error('Ocurrió un error: ', error)
        }
    }

  return (
    <div className="container">
        <h1 className="title">Buscador de Películas</h1>
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder='Buscar película'
            value={searchMovie}
            onChange={handleInputChange}
            />
            <button type='submit' className="search-button">Search</button>
        </form>
        <div className="movie-list">
            {movies.map((movie) => (
                <div key={movie.id} className="movie-card">
                    <img src ={`https://image.tmdb.org/t/p/w500${movie.poster_path}` } alt={movie.title} />
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                </div>
            ))}
                
         </div>
        
    </div>
  )
}

export default BuscadorPeliculas