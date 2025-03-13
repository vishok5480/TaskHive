import styled from 'styled-components';
import { useSelector } from 'react-redux';
import TaskCard from './TaskCard';

const EmptyMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 1.1rem;
`;

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TaskList = ({ tasks, onEditTask }) => {
  console.log('TaskList received tasks:', tasks);
  console.log('TaskList received onEditTask:', !!onEditTask);

  const { loading, error } = useSelector((state) => {
    console.log('Current Redux State:', state); // Debug log
    return state.tasks;
  });

  if (loading) return <EmptyMessage>Loading tasks...</EmptyMessage>;
  if (error) return <EmptyMessage>Error: {error}</EmptyMessage>;
  
  console.log('Tasks:', tasks); // Debug log

  if (!tasks?.length) {
    return <EmptyMessage>No tasks yet. Create your first task to get started!</EmptyMessage>;
  }

  return (
    <TaskListContainer>
      {tasks.map((task) => (
        <TaskCard 
          key={task._id} 
          task={task} 
          onEdit={onEditTask}
        />
      ))}
    </TaskListContainer>
  );
};

export default TaskList; 