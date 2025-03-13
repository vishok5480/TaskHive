import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../features/tasks/tasksSlice';

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  opacity: ${props => props.$completed ? 0.7 : 1};
`;

const Title = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.2rem;
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
`;

const Description = styled.p`
  margin: 0 0 15px 0;
  color: #666;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Priority = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: ${props => {
    switch (props.level) {
      case 'high': return '#ffebee';
      case 'medium': return '#fff3e0';
      case 'low': return '#e8f5e9';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.level) {
      case 'high': return '#c62828';
      case 'medium': return '#ef6c00';
      case 'low': return '#2e7d32';
      default: return '#666';
    }
  }};
`;

const DueDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &.edit {
    background-color: #e3f2fd;
    color: #1976d2;
    &:hover { background-color: #bbdefb; }
  }
  
  &.delete {
    background-color: #ffebee;
    color: #c62828;
    &:hover { background-color: #ffcdd2; }
  }
`;

const CompleteButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  background-color: ${props => props.$completed ? '#f5f5f5' : '#4caf50'};
  color: ${props => props.$completed ? '#666' : 'white'};
  &:hover { 
    background-color: ${props => props.$completed ? '#eeeeee' : '#43a047'}; 
  }
  margin-right: 8px;
`;

const TaskCard = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${task._id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete task');
      dispatch(deleteTask(task._id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleComplete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tasks/${task._id}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ completed: !task.completed })
      });

      if (!response.ok) {
        const text = await response.text(); // Get raw response
        console.error('Server response:', text);
        throw new Error('Failed to complete task');
      }
      
      // Optimistically update UI
      dispatch(updateTask({
        ...task,
        completed: !task.completed
      }));

    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  if (!task) return null;
  
  return (
    <Card $completed={task.completed}>
      <Title $completed={task.completed}>{task.title}</Title>
      <Description>{task.description}</Description>
      <Footer>
        <div>
          <Priority level={task.priority}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Priority>
          <DueDate> Due: {new Date(task.dueDate).toLocaleDateString()}</DueDate>
        </div>
        <ButtonGroup>
          <CompleteButton 
            type="button"
            $completed={task.completed}
            onClick={handleComplete}
          >
            {task.completed ? 'Completed ✓' : 'Complete'}
          </CompleteButton>
          <Button className="edit" onClick={() => onEdit(task)}>
            Edit
          </Button>
          <Button className="delete" onClick={handleDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </Footer>
    </Card>
  );
};

export default TaskCard; 