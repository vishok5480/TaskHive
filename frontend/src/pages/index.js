import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../features/tasks/taskThunks';
import TaskList from '../components/TaskList';

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <div>
            <h1 className="text-2xl font-bold">TaskHive</h1>
            <TaskList />
        </div>
    );
};

export default HomePage;
