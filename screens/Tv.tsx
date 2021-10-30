import React from 'react';
import { FlatList, RefreshControl, ScrollView } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import { tvAPI, TvResponse } from '../api';
import Loader from '../components/Loader';
import VMedia from '../components/VMedia';
import styled from 'styled-components/native';
import HList from '../components/HList';

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

const Tv = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefreshing,
  } = useQuery<TvResponse>(['tv', 'today'], tvAPI.airingToday);
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefreshing,
  } = useQuery<TvResponse>(['tv', 'top'], tvAPI.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefreshing,
  } = useQuery<TvResponse>(['tv', 'trending'], tvAPI.trending);

  const onRefresh = () => {
    queryClient.refetchQueries(['tv']);
  };

  const loading: boolean = todayLoading || topLoading || trendingLoading;
  const refreshing: boolean =
    todayRefreshing || topRefreshing || trendingRefreshing;
  if (loading) {
    return <Loader />;
  } else {
    return (
      <ScrollView
        contentContainerStyle={{ paddingVertical: 30 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {trendingData && (
          <HList title={'Trending TV'} data={trendingData.results} />
        )}
        {todayData && <HList title={'Airing Today'} data={todayData.results} />}
        {topData && <HList title={'Top Rated TV'} data={topData.results} />}
      </ScrollView>
    );
  }
};

export default Tv;
