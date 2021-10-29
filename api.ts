import { ITvs } from './screens/Tv';
import { IMovies } from './screens/Movies';
import { TMDB_API_KEY } from './secrets';

const BASE_URL = 'https://api.themoviedb.org/3';

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: IMovies[];
}

export interface TvResponse extends BaseResponse {
  results: ITvs[];
}

export const moviesAPI = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`).then(
      (res) => res.json()
    ),
  upcoming: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=3`
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`
    ).then((res) => res.json()),
};

export const tvAPI = {
  trending: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}`).then((res) =>
      res.json()
    ),
  airingToday: () =>
    fetch(
      `${BASE_URL}/tv/airing_today?api_key=${TMDB_API_KEY}&language=en-US&page=1`
    ).then((res) => res.json()),
  topRated: () =>
    fetch(
      `${BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`
    ).then((res) => res.json()),
};
