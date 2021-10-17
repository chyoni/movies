import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation: { navigate },
}) => (
  <Container>
    <TouchableOpacity onPress={() => navigate('Stack', { screen: 'One' })}>
      <Title>Movies</Title>
    </TouchableOpacity>
  </Container>
);

export default Movies;
