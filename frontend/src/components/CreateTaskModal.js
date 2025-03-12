import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const PriorityTag = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  ${props => {
    switch (props.priority) {
      case 'high':
        return 'background: #FEE2E2; color: #DC2626;';
      case 'medium':
        return 'background: #FEF3C7; color: #D97706;';
      case 'low':
        return 'background: #ECFDF5; color: #059669;';
      default:
        return '';
    }
  }}
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  
  ${props => props.primary ? `
    background: #0070f3;
    color: white;
    &:hover {
      background: #0051cc;
    }
  ` : `
    background: #f5f5f5;
    color: #333;
    &:hover {
      background: #eaeaea;
    }
  `}
`;

const CreateTaskModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit({
      title: formData.get('title'),
      description: formData.get('description'),
      priority: formData.get('priority'),
      dueDate: formData.get('dueDate')
    });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Title>Create New Task</Title>
        <Form onSubmit={handleSubmit}>
          <Input 
            name="title"
            placeholder="Task Title"
            required
          />
          <TextArea 
            name="description"
            placeholder="Task Description"
            required
          />
          <Select name="priority" required>
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
          <Input 
            type="date"
            name="dueDate"
            required
          />
          <ButtonGroup>
            <Button type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" primary>Create Task</Button>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateTaskModal; 