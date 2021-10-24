import React from 'react';
import styled from 'styled-components/native';
import { makeImgPath } from '../utils';

interface PosterProps {
  path: string;
}

const Image = styled.Image`
  width: 120px;
  height: 160px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
`;

const Poster: React.FC<PosterProps> = ({ path }) => {
  return <Image source={{ uri: makeImgPath(path) }} />;
};

export default Poster;
