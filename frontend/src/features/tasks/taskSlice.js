import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks, addTask } from './taskThunks';

const initialState = {
    tasks: [],
    status: 'idle',
    error: null
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            });
    }
});

export default taskSlice.reducer;
