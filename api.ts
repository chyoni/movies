import { TMDB_API_KEY } from './secrets';

const BASE_URL = 'https://api.themoviedb.org/3';

const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`).then((res) =>
    res.json()
  );

const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=3`
  ).then((res) => res.json());

const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());

export const moviesAPI = { trending, upcoming, nowPlaying };