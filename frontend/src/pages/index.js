import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '@/features/tasks/taskThunks';
import styled from 'styled-components';
import CreateTaskModal from '@/components/CreateTaskModal';
import EditTaskModal from '@/components/EditTaskModal';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: #f8fafc;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.5px;
`;

const CreateButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const TaskCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px -1px rgba(0, 0, 0, 0.1);
  }
`;

const TaskContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TaskTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const TaskDescription = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const TaskMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

const PriorityTag = styled.span`
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  ${props => {
    switch (props.priority) {
      case 'high':
        return 'background: #fee2e2; color: #dc2626;';
      case 'medium':
        return 'background: #fef3c7; color: #d97706;';
      case 'low':
        return 'background: #ecfdf5; color: #059669;';
      default:
        return '';
    }
  }}
`;

const DueDate = styled.span`
  color: #64748b;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const CompleteButton = styled.button`
  width: 100%;
  background: #22c55e;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.2s;

  &:hover {
    background: #16a34a;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #64748b;
`;

const TaskActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  
  ${props => props.primary ? `
    background: #3b82f6;
    color: white;
    &:hover {
      background: #2563eb;
    }
  ` : `
    background: #f3f4f6;
    color: #374151;
    &:hover {
      background: #e5e7eb;
    }
  `}
`;

const HomePage = () => {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.tasks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

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
            
            if (!response.ok) throw new Error('Failed to create task');
            
            // Refresh tasks list
            dispatch(fetchTasks());
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating task:', error);
            // TODO: Add error handling
        }
    };

    const handleCompleteTask = async (id) => {
        try {
            await fetch(`http://localhost:3001/tasks/${id}/complete`, {
                method: 'PATCH',
            });
            dispatch(fetchTasks());
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const handleEditTask = async (taskData) => {
        try {
            await fetch(`http://localhost:3001/tasks/${taskData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });
            dispatch(fetchTasks());
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    if (loading) return <Container><EmptyState>Loading...</EmptyState></Container>;
    if (error) return <Container><EmptyState>Error: {error}</EmptyState></Container>;

    return (
        <Container>
            <Header>
                <Title>TaskHive</Title>
                <CreateButton onClick={handleCreateTask}>
                    + New Task
                </CreateButton>
            </Header>
            
            {tasks.length === 0 ? (
                <EmptyState>
                    <h3>No tasks yet</h3>
                    <p>Create your first task to get started!</p>
                </EmptyState>
            ) : (
                <TaskGrid>
                    {tasks.map((task) => (
                        <TaskCard key={task.id}>
                            <TaskContent>
                                <div>
                                    <TaskTitle>{task.title}</TaskTitle>
                                    <TaskDescription>{task.description}</TaskDescription>
                                </div>
                                <TaskMeta>
                                    <PriorityTag priority={task.priority}>
                                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                    </PriorityTag>
                                    <DueDate>
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </DueDate>
                                </TaskMeta>
                                <TaskActions>
                                    <CompleteButton onClick={() => handleCompleteTask(task.id)}>
                                        Complete Task
                                    </CompleteButton>
                                    <Button 
                                        onClick={() => {
                                            setSelectedTask(task);
                                            setIsEditModalOpen(true);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </TaskActions>
                            </TaskContent>
                        </TaskCard>
                    ))}
                </TaskGrid>
            )}
            <CreateTaskModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitTask}
            />
            <EditTaskModal 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditTask}
                task={selectedTask}
            />
        </Container>
    );
};

export default HomePage;
