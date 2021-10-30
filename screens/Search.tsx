import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { moviesAPI, tvAPI } from '../api';

const Container = styled.ScrollView``;
const SearchBar = styled.TextInput`
  background-color: ${(props) => props.theme.textInputBgColor};
  padding: 10px; 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  color: ${(props) => props.theme.textColor};
`;

const Search = () => {
  const [query, setQuery] = useState('');

  const {
    isLoading: moviesIsLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(['searchMovies', query], moviesAPI.search, {
    // 즉시 API를 때리는 걸 막아주는 옵션
    enabled: false,
  });
  const {
    isLoading: tvsIsLoading,
    data: tvsData,
    refetch: searchTvs,
  } = useQuery(['searchTvs', query], tvAPI.search, {
    // 즉시 API를 때리는 걸 막아주는 옵션
    enabled: false,
  });

  const onChangeText = (text: string): void => setQuery(text);
  const onSubmit = () => {
    if (query === '') {
      return;
    }
    searchMovies();
    searchTvs();
  };
  return (
    <Container>
      <SearchBar
        placeholder={'Search for Movie or TV Show'}
        placeholderTextColor={'grey'}
        returnKeyType={'search'}
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
      />
    </Container>
  );
};

export default Search;
