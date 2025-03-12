import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setTasks, setLoading, setError } from './tasksSlice';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get('http://localhost:3001/tasks');
      dispatch(setTasks(response.data));
      return response.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);