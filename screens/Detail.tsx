import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Poster from '../components/Poster';
import { ChildrenStackParamList } from '../navigation/Stack';
import { LinearGradient } from 'expo-linear-gradient';
import { makeImgPath, SCREEN_HIGHT } from '../utils';
import { BLACK_COLOR, WHITE_COLOR } from '../colors';
import { useQuery } from 'react-query';
import { moviesAPI, tvAPI } from '../api';

const Contaier = styled.ScrollView``;
const Header = styled.View`
  height: ${SCREEN_HIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;
const Background = styled.Image``;
const Column = styled.View`
  flex-direction: row;
`;
const Title = styled.Text`
  color: ${WHITE_COLOR};
  font-size: 36px;
  align-self: flex-end;
  width: 70%;
  margin-left: 15px;
  font-weight: 500;
  padding: 0 5px;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 30px;
  padding: 0px 20px;
`;

const Detail: React.FC<
  NativeStackScreenProps<ChildrenStackParamList, 'Detail'>
> = ({ route: { params }, navigation }) => {
  const { isLoading: moviesLoading, data: moviesData } = useQuery(
    ['movies', params.fullData.id.toString()],
    moviesAPI.detail,
    { enabled: 'original_title' in params.fullData }
  );
  const { isLoading: tvsLoading, data: tvsData } = useQuery(
    ['tv', params.fullData.id.toString()],
    tvAPI.detail,
    { enabled: 'original_name' in params.fullData }
  );
  useEffect(() => {
    navigation.setOptions({
      title: params.fullData.original_title ? 'Movie' : 'TV Show',
    });
  }, []);
  console.log('movies', moviesData);
  console.log('tvs', tvsData);
  return (
    <Contaier>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.fullData.backdrop_path || '') }}
        />
        <LinearGradient
          colors={['transparent', BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.fullData.poster_path || ''} />
          <Title>
            {params.fullData.original_name
              ? params.fullData.original_name
              : params.fullData.original_title}
          </Title>
        </Column>
      </Header>
      <Overview>
        {params.fullData.overview ? params.fullData.overview : 'Overview'}
      </Overview>
    </Contaier>
  );
};

export default Detail;
