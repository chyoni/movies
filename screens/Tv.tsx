import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import { tvAPI, TvResponse } from '../api';
import Loader from '../components/Loader';
import VMedia from '../components/VMedia';
import styled from 'styled-components/native';

export interface ITvs {
  id: number;
  poster_path: string | null;
  genre_ids: Array<number>;
  original_name: string;
  original_language: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  vote_average: number;
  overview: string;
}

const Seperator = styled.View`
  margin-right: 20px;
`;

const Tv = () => {
  const { isLoading: todayLoading, data: todayData } = useQuery<TvResponse>(
    ['tv', 'today'],
    tvAPI.airingToday
  );
  const { isLoading: topLoading, data: topData } = useQuery<TvResponse>(
    ['tv', 'top'],
    tvAPI.topRated
  );
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<TvResponse>(['tv', 'trending'], tvAPI.trending);
  const renderItem = ({ item }: { item: ITvs }) => (
    <VMedia
      id={item.id}
      original_title={item.original_name}
      poster_path={item.poster_path}
      vote_average={item.vote_average}
    />
  );

  const loading: boolean = todayLoading || topLoading || trendingLoading;
  if (loading) {
    return <Loader />;
  } else {
    return (
      <ScrollView>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Seperator />}
          data={trendingData?.results}
          renderItem={renderItem}
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Seperator />}
          data={todayData?.results}
          renderItem={renderItem}
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Seperator />}
          data={topData?.results}
          renderItem={renderItem}
        />
      </ScrollView>
    );
  }
};

export default Tv;
