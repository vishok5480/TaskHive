import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (searchTerm = '') => {
    try {
      const response = await fetch(`http://localhost:3001/tasks?search=${searchTerm}`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      return response.json();
    } catch (error) {
      throw error;
    }
  }
); 