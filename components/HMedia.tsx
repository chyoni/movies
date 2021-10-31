import React from 'react';
import Poster from './Poster';
import styled from 'styled-components/native';
import Votes from './Votes';
import { useNavigation } from '@react-navigation/core';
import { stackScreenProp } from './VMedia';
import { TouchableOpacity } from 'react-native';
import { IMovies } from '../screens/Movies';

interface HMediaProps {
  id: number;
  poster_path: string | null;
  original_title: string;
  overview: string;
  release_date?: string;
  vote_average?: number;
  fullData: IMovies;
}

const View = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;
const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.7;
  width: 80%;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Release = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 13px;
  margin-bottom: 10px;
`;

const HMedia: React.FC<HMediaProps> = ({
  id,
  original_title,
  overview,
  poster_path,
  release_date,
  vote_average,
  fullData,
}) => {
  const navigation = useNavigation<stackScreenProp>();
  const goToDetail = () => {
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: { fullData },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <View key={id}>
        <Poster path={poster_path!} />
        <HColumn>
          <Title>
            {original_title.slice(0, 21)}
            {original_title.length > 21 ? ' ...' : null}
          </Title>
          {release_date && (
            <Release>
              {new Date(release_date).toLocaleDateString('ko', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Release>
          )}
          {vote_average && <Votes vote_average={vote_average} />}
          <Overview>
            {overview !== '' && overview.length > 140
              ? `${overview.slice(0, 140)} ...`
              : overview}
          </Overview>
        </HColumn>
      </View>
    </TouchableOpacity>
  );
};

export default HMedia;
