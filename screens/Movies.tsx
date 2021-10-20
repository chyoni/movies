import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import { makeImgPath } from '../utils';
import { TMDB_API_KEY } from './../secrets';
import { BlurView } from 'expo-blur';

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
const Title = styled.Text``;

const { height: SCREEN_HIGHT } = Dimensions.get('window');

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
}

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation: { navigate },
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [nowPlaying, setNowPlaying] = useState<Array<IMovies>>([]);
  const getNowPlaying = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=KR&page=1`
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
        loop
        timeout={3.5}
        controlsEnabled={false}
        containerStyle={{ width: '100%', height: SCREEN_HIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg source={{ uri: makeImgPath(movie.backdrop_path!) }} />
            <BlurView intensity={80} style={StyleSheet.absoluteFill}>
              <Title>{movie.title}</Title>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </ScrollView>
  );
};

export default Movies;
