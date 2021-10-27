import React from 'react';
import styled from 'styled-components/native';

interface VotesProps {
  vote_average: number;
}

const Vote = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Votes: React.FC<VotesProps> = ({ vote_average }) => {
  return <Vote>⭐️ {vote_average} / 10</Vote>;
};

export default Votes;
