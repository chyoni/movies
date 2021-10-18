import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Dimensions } from 'react-native';
import Swiper from 'react-native-web-swiper';
import styled from 'styled-components/native';
import { TMDB_API_KEY } from './../secrets';
const ScrollView = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
  flex: 1;
`;

const { height: SCREEN_HIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation: { navigate },
}) => {
  const getNowPlaying = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=KR&page=1`
    );
  };
  return (
    <ScrollView>
      <Swiper
        loop
        timeout={3.5}
        containerStyle={{ width: '100%', height: SCREEN_HIGHT / 4 }}
      >
        <View style={{ backgroundColor: 'red' }}></View>
        <View style={{ backgroundColor: 'blue' }}></View>
        <View style={{ backgroundColor: 'white' }}></View>
        <View style={{ backgroundColor: 'purple' }}></View>
      </Swiper>
    </ScrollView>
  );
};

export default Movies;
