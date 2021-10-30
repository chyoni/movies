import React, { useState } from 'react';
import { FlatList, RefreshControl, ScrollView } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import { tvAPI, TvResponse } from '../api';
import Loader from '../components/Loader';
import VMedia from '../components/VMedia';
import styled from 'styled-components/native';
import HList from '../components/HList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChildrenTabsParamList } from '../navigation/Tabs';

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

const Tv: React.FC<NativeStackScreenProps<ChildrenTabsParamList, 'Tv'>> =
  () => {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState<boolean>(false);
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

    const onRefresh = async () => {
      setRefreshing(true);
      await queryClient.refetchQueries(['tv']);
      setRefreshing(false);
    };

    const loading: boolean = todayLoading || topLoading || trendingLoading;
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
          {todayData && (
            <HList title={'Airing Today'} data={todayData.results} />
          )}
          {topData && <HList title={'Top Rated TV'} data={topData.results} />}
        </ScrollView>
      );
    }
  };

export default Tv;
