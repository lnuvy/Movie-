import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useReturnData() {

    const [movies, setMovies] = useState([])

    useEffect( () => {
        axios('https://yts.mx/api/v2/list_movies.json?limit=12')
            .then( res => {
            console.log(res.data.data.movies)
            return res.data.data.movies;
        })
        .then((res) => {
            const m = res
            setMovies(m)
        })
      }, [])

    return movies;
}
