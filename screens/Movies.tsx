import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import { TMDB_API_KEY } from './../secrets';
import Slide from '../components/Slide';
import HMedia from '../components/HMedia';
import VMedia from '../components/VMedia';

interface IMovies {
  id: number;
  poster_path: string | null;
  adult: boolean;
  release_date: string;
  genre_ids: Array<number>;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  overview: string;
}

const ScrollView = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;
const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const View = styled.View`
  flex: 1;
`;
const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-left: 30px;
  font-weight: 600;
  font-size: 18px;
`;
const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;
const ListContainer = styled.View`
  margin-bottom: 30px;
`;

const HMovieContainer = styled.View`
  margin-top: 30px;
`;

const { height: SCREEN_HIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation: { navigate },
}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [nowPlaying, setNowPlaying] = useState<Array<IMovies>>([]);
  const [upcoming, setUpcoming] = useState<Array<IMovies>>([]);
  const [trending, setTrending] = useState<Array<IMovies>>([]);
  const getTrending = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
    );
    const { results } = await res.json();
    setTrending(results);
  };
  const getUpcoming = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=3`
    );
    const { results } = await res.json();
    setUpcoming(results);
  };
  const getNowPlaying = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`
    );
    const { results } = await res.json();
    setNowPlaying(results);
  };
  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{
          marginBottom: 30,
          width: '100%',
          height: SCREEN_HIGHT / 4,
        }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <Slide
              key={movie.id}
              backdropPath={movie.backdrop_path!}
              posterPath={movie.poster_path!}
              title={movie.title}
              voteAverage={movie.vote_average}
              overview={movie.overview}
            />
          </View>
        ))}
      </Swiper>
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
          contentContainerStyle={{ paddingLeft: 30 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trending.map((movie) => (
            <VMedia
              key={movie.id}
              id={movie.id}
              original_title={movie.original_title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
            />
          ))}
        </TrendingScroll>
      </ListContainer>
      <ListTitle>Coming soon</ListTitle>
      <HMovieContainer>
        {upcoming.map((movie) => (
          <HMedia
            key={movie.id}
            id={movie.id}
            original_title={movie.original_title}
            overview={movie.overview}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
          />
        ))}
      </HMovieContainer>
    </ScrollView>
  );
};

export default Movies;
