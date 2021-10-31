import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, Linking } from 'react-native';
import styled from 'styled-components/native';
import Poster from '../components/Poster';
import { ChildrenStackParamList } from '../navigation/Stack';
import { LinearGradient } from 'expo-linear-gradient';
import { makeImgPath, SCREEN_HIGHT } from '../utils';
import { BLACK_COLOR, WHITE_COLOR } from '../colors';
import { useQuery } from 'react-query';
import { Ionicons } from '@expo/vector-icons';
import { moviesAPI, tvAPI } from '../api';
import Loader from '../components/Loader';
import * as WebBrowser from 'expo-web-browser';

interface AppendResponseVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

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
const Data = styled.View`
  padding: 0px 20px;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 30px 0;
`;
const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 3px 0;
`;
const BtnText = styled.Text`
  margin-left: 10px;
  color: ${(props) => props.theme.textColor};
`;

const Detail: React.FC<
  NativeStackScreenProps<ChildrenStackParamList, 'Detail'>
> = ({ route: { params }, navigation }) => {
  const isMovie = 'original_title' in params.fullData;
  const { isLoading, data } = useQuery(
    [isMovie ? 'movies' : 'tv', params.fullData.id.toString()],
    isMovie ? moviesAPI.detail : tvAPI.detail
  );

  const openYTLink = async (videoKey: string) => {
    const baseURL = `http://m.youtube.com/watch?v=${videoKey}`;
    // await Linking.openURL(baseURL);
    await WebBrowser.openBrowserAsync(baseURL);
  };

  useEffect(() => {
    navigation.setOptions({
      title: params.fullData.original_title ? 'Movie' : 'TV Show',
    });
  }, []);
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
      <Data>
        <Overview>
          {params.fullData.overview ? params.fullData.overview : 'Overview'}
        </Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video: AppendResponseVideo) => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons name={'logo-youtube'} color={'red'} size={18} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Contaier>
  );
};

export default Detail;
