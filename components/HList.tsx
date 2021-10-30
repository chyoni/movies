import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import VMedia from './VMedia';
import { IMovies } from '../screens/Movies';
import { ITvs } from '../screens/Tv';

interface MovieOrTv {
  id: number;
  poster_path: string | null;
  adult?: boolean;
  release_date?: string;
  genre_ids: Array<number>;
  original_title?: string;
  original_name?: string;
  original_language: string;
  title?: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  overview: string;
}

interface HListProps {
  title: string;
  data: IMovies[] | ITvs[];
}

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-left: 30px;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 20px;
`;
const ListContainer = styled.View`
  margin-bottom: 30px;
`;
const Seperator = styled.View`
  margin-right: 20px;
`;

const HList: React.FC<HListProps> = ({ title, data }) => {
  const keyExtractor = (item: MovieOrTv) => item.id.toString();

  const renderItem = ({ item }: { item: MovieOrTv }) => (
    <VMedia
      id={item.id}
      original_title={
        item.original_name ? item.original_name! : item.original_title!
      }
      poster_path={item.poster_path}
      vote_average={item.vote_average}
    />
  );
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        horizontal
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        ItemSeparatorComponent={() => <Seperator />}
        data={data as any}
        renderItem={renderItem}
      />
    </ListContainer>
  );
};

export default HList;
