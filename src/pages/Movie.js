import React, { Children, useEffect, useState } from "react";
import { useParams, Link, NavLink, useSearchParams, useLocation } from 'react-router-dom';
import axios from "axios";
// import movies from "../useReturnData";
import './Movie.css'

export default function Movie() {
    const params = useParams();
    const [movies, setMovies] = useState([])

    // 선택된 NavLink 활성화 스타일
    const applyActiveColor = ({ isActive }) => (isActive ? {color: 'orangered'} : {})

    // 키워드 검색
    const [searchParams, setSearchParams] = useSearchParams() // const Test


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

    const changeQueryString = (e) => {
        const filter = e.target.value
        if(filter) {
            setSearchParams({ filter })
        } else {
        setSearchParams({})
        }
    }

    const QueryNavLink = ({ to, children, ...props }) => {
        const location = useLocation()
        return <NavLink to={to + location.search} {...props}>{children}</NavLink>
    }


    // const mov = movies[params.movieId]

    const moviesFiltered = movies
        .filter( m => {
            const filter = searchParams.get('filter');
            if(!filter) return true;
            const title = m.title.toLowerCase()
            return title.includes(filter.toLowerCase())
        })
    const mov = moviesFiltered[params.movieId]

    return (
        <>
            <br/>
            <input className="filter-movie" value={searchParams.get('filter') || ""} onChange={changeQueryString} placeholder="Search ..."></input>

            {mov ? 
                <div className="movie-container">
                    <img src={mov.medium_cover_image}/>
                    <h1>{mov.title_long}</h1>
                    <p>장르 : {mov.genres.join(' ')}</p>
                    <span>언어 : {mov.language}</span>
                </div> : <h1>Movie Page</h1>
            }
                
            {movies
                .filter( mov => {
                    const filter = searchParams.get('filter')
                    if(!filter) return true;
                    const title = mov.title.toLowerCase()
                    return title.includes(filter.toLowerCase())
                })
                .map((mov, id) => {
                return (
                    <QueryNavLink key={id} to={`/movies/${id}`} className="movie-item" style={applyActiveColor}>{mov.title_long}</QueryNavLink>
                )
            })}
                
        </>
    )
}