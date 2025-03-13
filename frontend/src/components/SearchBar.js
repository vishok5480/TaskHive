import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../features/tasks/taskThunks';

const SearchContainer = styled.div`
  margin: 20px 0;
  width: 100%;
  max-width: 800px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 2px 8px rgba(0, 102, 204, 0.2);
  }

  &::placeholder {
    color: #888;
  }
`;

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    dispatch(fetchTasks(searchTerm));
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search tasks by title or description..."
        onChange={handleSearch}
      />
    </SearchContainer>
  );
};

export default SearchBar; 