import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { updateTask, fetchTasks } from '../features/tasks/tasksSlice';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 100px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &.primary {
    background-color: #0066cc;
    color: white;
    &:hover { background-color: #0052a3; }
  }
  
  &.secondary {
    background-color: #ddd;
    color: #333;
    &:hover { background-color: #ccc; }
  }
`;

const EditTaskModal = ({ isOpen, onClose, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      console.log('Task received for editing:', task);
      setTitle(task.title || '');
      setDescription(task.description || '');
      setPriority(task.priority || 'medium');
      setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit clicked');
    
    try {
      const response = await fetch(`http://localhost:3001/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          dueDate: new Date(dueDate).toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Failed to update task');
      
      const updatedTask = await response.json();
      dispatch(updateTask(updatedTask));
      
      // Force cleanup and close
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      console.log('Calling onClose');
      onClose();
      console.log('Called onClose');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Force close on unmount
  useEffect(() => {
    return () => {
      if (isOpen) {
        console.log('Forcing close on unmount');
        onClose();
      }
    };
  }, [isOpen, onClose]);

  if (!task) {
    console.log('No task provided to EditTaskModal');
    return null;
  }

  return (
    <ModalOverlay $isVisible={isOpen} onClick={(e) => {
      if (e.target === e.currentTarget) {
        console.log('Overlay clicked');
        onClose();
      }
    }}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Edit Task</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextArea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </Select>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <ButtonGroup>
            <Button 
              type="button" 
              className="secondary" 
              onClick={() => {
                console.log('Cancel clicked');
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="primary">
              Update Task
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditTaskModal; 