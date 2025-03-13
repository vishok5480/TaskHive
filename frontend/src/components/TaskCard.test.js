import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TaskCard from './__mocks__/TaskCard';
import tasksReducer from '../features/tasks/tasksSlice';

// Mock styled-components to avoid styled-components related issues
jest.mock('styled-components', () => ({
  default: (Component) => Component,
}));

const renderWithRedux = (component) => {
  const store = configureStore({
    reducer: {
      tasks: tasksReducer,
    },
  });

  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('TaskCard', () => {
  const mockTask = {
    _id: '1',
    title: 'Test Task',
    description: 'Test Description',
    priority: 'high',
    dueDate: '2024-03-20'
  };

  it('renders task details correctly', () => {
    renderWithRedux(
      <TaskCard task={mockTask} />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('handles task completion', () => {
    renderWithRedux(
      <TaskCard task={mockTask} />
    );

    const completeButton = screen.getByText('Complete');
    // Add assertions based on your implementation
  });
}); 