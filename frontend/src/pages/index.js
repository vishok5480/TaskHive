import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '@/features/tasks/taskThunks';
import styled from 'styled-components';
import CreateTaskModal from '@/components/CreateTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import SearchBar from '../components/SearchBar';
import TaskList from '../components/TaskList';
import LoadingSpinner from '../components/LoadingSpinner';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 2.5rem;
`;

const Button = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0052a3;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-left: 10px;
  font-size: 1rem;
`;

const HomePage = () => {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.tasks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [sortBy, setSortBy] = useState('priority');
    const [sortOrder, setSortOrder] = useState('ascending');

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    console.log('Current tasks:', tasks);

    const handleCreateTask = () => {
        setIsModalOpen(true);
    };

    const handleSubmitTask = async (taskData) => {
        try {
            const response = await fetch('http://localhost:3001/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            
            dispatch(fetchTasks());
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating task:', error);
            alert(error.message);
        }
    };

    const handleCompleteTask = async (id) => {
        try {
            console.log('Completing task:', id); // Debug log
            const response = await fetch(`http://localhost:3001/tasks/${id}/complete`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to complete task');
            }
            
            dispatch(fetchTasks());
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingTask(null);
    };

    const handleDeleteTask = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            console.log('Attempting to delete task:', id); // Debug log
            
            const response = await fetch(`http://localhost:3001/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response status:', response.status); // Debug log

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error data:', errorData); // Debug log
                throw new Error(errorData.message || 'Failed to delete task');
            }

            console.log('Task deleted successfully'); // Debug log
            dispatch(fetchTasks());
        } catch (error) {
            console.error('Delete error details:', error); // Debug log
            alert(`Error deleting task: ${error.message}`);
        }
    };

    const sortTasks = (tasksToSort) => {
        return [...tasksToSort].sort((a, b) => {
            let comparison = 0;
            if (sortBy === 'priority') {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
            } else if (sortBy === 'dueDate') {
                comparison = new Date(a.dueDate) - new Date(b.dueDate);
            }
            return sortOrder === 'ascending' ? comparison : -comparison;
        });
    };

    const sortedTasks = tasks ? sortTasks(tasks) : [];

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;

    return (
        <Container>
            <Title>TaskHive</Title>
            <SearchBar />
            <Controls>
                <Button onClick={() => setIsModalOpen(true)}>+ New Task</Button>
                <div>
                    <Select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="priority">Sort by Priority</option>
                        <option value="dueDate">Sort by Due Date</option>
                    </Select>
                    <Select 
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </Select>
                </div>
            </Controls>
            <TaskList tasks={sortedTasks} onEditTask={handleEditTask} />
            <CreateTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <EditTaskModal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                task={editingTask}
            />
        </Container>
    );
};

export default HomePage;
