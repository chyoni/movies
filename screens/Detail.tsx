import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { ChildrenStackParamList } from '../navigation/Stack';

const Contaier = styled.ScrollView``;

const Detail: React.FC<
  NativeStackScreenProps<ChildrenStackParamList, 'Detail'>
> = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.originalTitle,
    });
  }, []);
  return (
    <Contaier>
      <Text>Detail</Text>
    </Contaier>
  );
};

export default Detail;
