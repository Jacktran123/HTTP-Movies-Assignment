import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import { useParams,useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import {Button} from 'reactstrap';

function Movie({ addToSavedList, movieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history=useHistory();
  console.log(params.id);

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };
   
  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie informations...</div>;
  }
   
  const deleteMovie=()=>{
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(res=> console.log(res))
    .catch(err=> console.error(err));

  }
  
  axios.post()

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div className="save-button update">
        <Button color='primary'><Link to={`/update-movie/${params.id}`} > Update </Link> </Button>
      </div>

      <div className="save-button delete">
          <i className="fas fa-window-close" onClick={deleteMovie}></i>
      </div>
    </div>
  );
}

export default Movie;
