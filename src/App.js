import "./App.css";
import react, { useEffect, useState } from "react";
import Movie from "./Movie";
import Filter from "./Filter";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  const base_url =
    "https://api.themoviedb.org/3/movie/popular?api_key=ce4ac4c3a0887b65b6aebf6774827e49&language=en-US&page=1";
  const fetchPopular = async () => {
    const data = await fetch(base_url);
    const movies = await data.json();
    console.log(movies);
    setPopular(movies.results);
    setFiltered(movies.results);
  };
  useEffect(() => {
    fetchPopular();
  }, []);

  return (
    <div className="App">
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <motion.div
        animate={{y: 20}}
        layout
        className="popular-movies"
      >
        <AnimatePresence>
        {filtered.map((movie) => {
          return <Movie key={movie.id} movie={movie} />;
        })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
