import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import Slide from '../components/Slide';
import HMedia from '../components/HMedia';
import VMedia from '../components/VMedia';
import Loader from '../components/Loader';
import { useQuery, useQueryClient } from 'react-query';
import { MovieResponse, moviesAPI } from '../api';
import { ChildrenTabsParamList } from '../navigation/Tabs';
import { SCREEN_HIGHT } from '../utils';

export interface IMovies {
  id: number;
  poster_path: string | null;
  adult: boolean;
  release_date: string;
  genre_ids: Array<number>;
  original_title: string;
  original_name: string | undefined;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  overview: string;
}
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

const Movies: React.FC<
  NativeStackScreenProps<ChildrenTabsParamList, 'Movies'>
> = ({ navigation: { navigate } }) => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>(['movies', 'nowPlaying'], moviesAPI.nowPlaying);
  const { isLoading: upcomingLoading, data: upcomingData } =
    useQuery<MovieResponse>(['movies', 'upcoming'], moviesAPI.upcoming);
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MovieResponse>(['movies', 'trending'], moviesAPI.trending);
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['movies']);
    setRefreshing(false);
  };
  const vRenderItem = ({ item }: { item: IMovies }) => (
    <VMedia
      id={item.id}
      original_title={item.original_title}
      poster_path={item.poster_path}
      vote_average={item.vote_average}
      fullData={item}
    />
  );
  const hRenderItem = ({ item }: { item: IMovies }) => (
    <HMedia
      id={item.id}
      original_title={item.original_title}
      overview={item.overview}
      poster_path={item.poster_path}
      release_date={item.release_date}
      fullData={item}
    />
  );
  const movieKeyExtractor = (item: IMovies) => item.id.toString();
  const loading: boolean =
    nowPlayingLoading || upcomingLoading || trendingLoading;
  return loading ? (
    <Loader />
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
            {nowPlayingData?.results.map((movie: IMovies) => (
              <View key={movie.id}>
                <Slide
                  key={movie.id}
                  backdropPath={movie.backdrop_path!}
                  posterPath={movie.poster_path!}
                  title={movie.title}
                  voteAverage={movie.vote_average}
                  overview={movie.overview}
                  fullData={movie}
                />
              </View>
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <FlatList
              data={trendingData?.results}
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
      data={upcomingData?.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={() => <HSeperator />}
      renderItem={hRenderItem}
    />
  );
};

export default Movies;
