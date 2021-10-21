import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import { makeImgPath } from '../utils';
import { TMDB_API_KEY } from './../secrets';
import { BlurView } from 'expo-blur';

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
const View = styled.View`
  flex: 1;
`;
const Loader = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Title = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? 'white' : 'black')};
  font-weight: 600;
`;
const Poster = styled.Image`
  width: 120px;
  height: 160px;
  border-radius: 10px;
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;
const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;

const { height: SCREEN_HIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation: { navigate },
}) => {
  const isDark = useColorScheme() === 'dark';
  const [loading, setLoading] = useState<boolean>(true);
  const [nowPlaying, setNowPlaying] = useState<Array<IMovies>>([]);
  const getNowPlaying = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`
    );
    const { results } = await res.json();
    setNowPlaying(results);
    setLoading(false);
  };
  useEffect(() => {
    getNowPlaying();
  }, []);
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <ScrollView>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: '100%', height: SCREEN_HIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg source={{ uri: makeImgPath(movie.backdrop_path!) }} />
            <BlurView
              tint={isDark ? 'dark' : 'light'}
              intensity={70}
              style={StyleSheet.absoluteFill}
            >
              <Wrapper>
                <Poster source={{ uri: makeImgPath(movie.poster_path!) }} />
                <Column>
                  <Title isDark={isDark}>{movie.title}</Title>
                  <Votes isDark={isDark}>⭐️ {movie.vote_average} / 10</Votes>
                  <Overview isDark={isDark}>
                    {movie.overview.slice(0, 80)}...
                  </Overview>
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </ScrollView>
  );
};

export default Movies;
