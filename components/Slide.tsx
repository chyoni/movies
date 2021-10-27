import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import { makeImgPath } from '../utils';
import Poster from './Poster';

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  title: string;
  voteAverage: number;
  overview: string;
}

const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Title = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? 'white' : 'black')};
  font-weight: 600;
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;
const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  title,
  voteAverage,
  overview,
}) => {
  const isDark = useColorScheme() === 'dark';
  return (
    <>
      <BgImg source={{ uri: makeImgPath(backdropPath) }} />
      <BlurView
        tint={isDark ? 'dark' : 'light'}
        intensity={70}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{title}</Title>
            <Votes isDark={isDark}>⭐️ {voteAverage} / 10</Votes>
            <Overview isDark={isDark}>{overview.slice(0, 80)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </>
  );
};

export default Slide;