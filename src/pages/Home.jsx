import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"
import '../styles/Home.css'
import { getPopularMovies, searchMovies } from "../services/api";


function Home(){
  
  const[searchQuery, setSearchQuery] = useState("");
  const[movies, setMovies] = useState([]);
  const[error, setError] = useState(null);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try{
        const moviesList = await getPopularMovies();
        console.log(moviesList);
        setMovies(moviesList);
      } catch(err){
          setError(err)
      }
      finally{
        setLoading(false)
      }
    };

    loadPopularMovies();
  },[]);

  // const movies = [
  //   {id: 1, title: "John Wick", release_date: "2020"},
  //   {id: 2, title: "Terminator", release_date: "1999"},
  //   {id: 3, title: "The Matrix", release_date: "1998"},
  //   {id: 4, title: "John Wick", release_date: "2020"},
  // ]

  const handleSearch = async (e) => {
    e.preventDefault();
    if(!searchQuery.trim()) return;
    if(loading) return;
    setLoading(true);
    try{
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch(err){
      console.log(err);
      setError('Failed to search...');
    }
    finally{
      setLoading(false);
    }
  }

  return(
    <div className="home">
      <form className="search-form" onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search for movies..."
          className="search-input"  
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <div className="error-message">{error.message}</div>}

      {loading ? 
        <div className="loading">Loading...</div> :
        <div className="movies-grid">
          {movies.map((movie) => 
            // movie.title.toLowerCase().startsWith(searchQuery) && //this is to search movie
            <MovieCard movie={movie} key={movie.id}/>
          )}
        </div>
      }
      
    </div>
  )
}

export default Home