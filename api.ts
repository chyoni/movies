import { ITvs } from './screens/Tv';
import { IMovies } from './screens/Movies';
import { TMDB_API_KEY } from './secrets';
import { QueryFunctionContext } from 'react-query';

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
  upcoming: (context: QueryFunctionContext) =>
    // useInfiniteQuery는 2번째 인자로 queryFn을 받고 얘가 가지는 args는 context: QueryFunctionContext인데,
    // getNextPageParam 옵션 Fn을 잘 구현해놨다면 다음 page를 context.pageParam을 통해 쉽게 얻어올 수 있음
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=${context.pageParam}`
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`
    ).then((res) => res.json()),
  search: (context: QueryFunctionContext<string[]>) => {
    const [_, query] = context.queryKey;
    return fetch(
      `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=1`
    ).then((res) => res.json());
  },
  detail: (context: QueryFunctionContext<string[]>) => {
    const [_, id] = context.queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
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
  search: (context: QueryFunctionContext<string[]>) => {
    const [_, query] = context.queryKey;
    return fetch(
      `${BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&language=en-US&query=${query}&page=1`
    ).then((res) => res.json());
  },
  detail: (context: QueryFunctionContext<string[]>) => {
    const [_, id] = context.queryKey;
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};
