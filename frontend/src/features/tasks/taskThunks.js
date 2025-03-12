import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axiosInstance';

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
        const response = await axios.get('/tasks');
        return response.data;
    }
);

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (taskData) => {
        const response = await axios.post('/tasks', taskData);
        return response.data;
    }
);
