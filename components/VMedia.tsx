import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';

interface VMediaProps {
  id: number;
  poster_path: string | null;
  original_title: string;
  vote_average: number;
}

const View = styled.View`
  margin-right: 20px;
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
}) => {
  return (
    <View key={id}>
      <Poster path={poster_path!} />
      <Title>
        {original_title.slice(0, 13)}
        {original_title.length > 13 ? '...' : null}
      </Title>
      <Votes vote_average={vote_average} />
    </View>
  );
};

export default VMedia;
