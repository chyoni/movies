import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { IMovies } from '../screens/Movies';
import { ITvs } from '../screens/Tv';
import Poster from './Poster';
import Votes from './Votes';

interface VMediaProps {
  id: number;
  poster_path: string | null;
  original_title: string;
  vote_average: number;
  fullData: IMovies | ITvs;
}

export type stackScreenProp = NativeStackNavigationProp<any>;

const View = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const VMedia: React.FC<VMediaProps> = ({
  id,
  poster_path,
  original_title,
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
        <Title>
          {original_title.slice(0, 13)}
          {original_title.length > 13 ? '...' : null}
        </Title>
        <Votes vote_average={vote_average} />
      </View>
    </TouchableOpacity>
  );
};

export default VMedia;
