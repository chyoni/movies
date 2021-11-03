import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import Slide from '../components/Slide';
import HMedia from '../components/HMedia';
import VMedia from '../components/VMedia';
import Loader from '../components/Loader';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
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
  // const { isLoading: upcomingLoading, data: upcomingData } =
  //   useQuery<MovieResponse>(['movies', 'upcoming'], moviesAPI.upcoming);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<MovieResponse>(
    ['movies', 'upcoming'],
    moviesAPI.upcoming,
    {
      // 여기서 currentPage는 fetcher가 불러온 api의 응답을 의미하고, 그 응답값 안에 현재 page와 total_page가 있으므로
      // 현재 page가 마지막 page인지 아닌지 쉽게 알아낼 수 있다. 이를 통해 하나 유추가 가능한건, 만약 내가 개인적으로 api를 만들고 그걸 리스트로 뿌려줄 때 인피니티스크롤을 사용할거라면
      // 나도 응답값으로 page와 total_page정보를 뿌려줘야 한다는것 ?
      getNextPageParam: (currentPage) => {
        if (currentPage.page + 1 > currentPage.total_pages) {
          return null;
        }
        return currentPage.page + 1;
      },
    }
  );
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
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <FlatList
      onEndReached={loadMore}
      // onEndReachedThreshold는 onEndReached가 어디즈음에서 trigger될지를 지정하는 값 0.4면 1이 최대일 때 중간보다 좀 더 아래즘 내려가면 onEndReached가 triggered.
      onEndReachedThreshold={0.4}
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
      // upcomingData는 useInfiniteQueries로 부터 받은 데이터고 얘는 pages, pagesParam을 가지고 있음
      // pages는 배열로 되어 있고 그 배열 안에 results가 있음 이녀석도 배열이라 map을하게되면 [[ㅁ], [ㅁ], [ㅁ]] 이런 형태로 나옴 그래서 flat()으로 [ㅁ, ㅁ, ㅁ]이렇게 만들어 주는 것
      data={upcomingData?.pages.map((page) => page.results).flat()}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={() => <HSeperator />}
      renderItem={hRenderItem}
    />
  );
};

export default Movies;
