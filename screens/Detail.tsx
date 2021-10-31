import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import Poster from '../components/Poster';
import { ChildrenStackParamList } from '../navigation/Stack';

const Contaier = styled.ScrollView``;

const Detail: React.FC<
  NativeStackScreenProps<ChildrenStackParamList, 'Detail'>
> = ({ route: { params }, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: params.fullData.original_title || params.fullData.original_name,
    });
  }, []);
  return (
    <Contaier>
      <Poster path={params.fullData.poster_path || ''} />
    </Contaier>
  );
};

export default Detail;
