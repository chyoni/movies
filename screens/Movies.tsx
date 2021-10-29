import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import { TMDB_API_KEY } from './../secrets';
import Slide from '../components/Slide';
import HMedia from '../components/HMedia';
import VMedia from '../components/VMedia';
import { useQuery } from 'react-query';
import { moviesAPI } from '../api';

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
const ListContainer = styled.View`
  margin-bottom: 30px;
`;
const HListTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;
const Seperator = styled.View`
  margin-right: 20px;
`;
const HSeperator = styled.View`
  margin-bottom: 30px;
`;

const { height: SCREEN_HIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation: { navigate },
}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    'nowPlaying',
    moviesAPI.nowPlaying
  );
  const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
    'upcoming',
    moviesAPI.upcoming
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    'trending',
    moviesAPI.trending
  );
  const onRefresh = async () => {};
  const vRenderItem = ({ item }: { item: IMovies }) => (
    <VMedia
      id={item.id}
      original_title={item.original_title}
      poster_path={item.poster_path}
      vote_average={item.vote_average}
    />
  );
  const hRenderItem = ({ item }: { item: IMovies }) => (
    <HMedia
      id={item.id}
      original_title={item.original_title}
      overview={item.overview}
      poster_path={item.poster_path}
      release_date={item.release_date}
    />
  );
  const movieKeyExtractor = (item: IMovies) => item.id.toString();
  const loading: boolean =
    nowPlayingLoading || upcomingLoading || trendingLoading;
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
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
            {nowPlayingData.results.map((movie: IMovies) => (
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
            <FlatList
              data={trendingData.results}
              horizontal
              keyExtractor={movieKeyExtractor}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 30, marginTop: 30 }}
              ItemSeparatorComponent={() => <Seperator />}
              renderItem={vRenderItem}
            />
          </ListContainer>
          <HListTitle>Coming soon</HListTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={() => <HSeperator />}
      renderItem={hRenderItem}
    />
  );
};

export default Movies;
