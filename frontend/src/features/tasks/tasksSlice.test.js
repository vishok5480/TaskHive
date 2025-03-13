import tasksReducer, { setTasks, setLoading, setError } from './tasksSlice';

describe('tasks reducer', () => {
  const initialState = {
    tasks: [],
    loading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(tasksReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setTasks', () => {
    const mockTasks = [
      { _id: '1', title: 'Task 1' },
      { _id: '2', title: 'Task 2' }
    ];

    const actual = tasksReducer(initialState, setTasks(mockTasks));
    expect(actual.tasks).toEqual(mockTasks);
  });

  it('should handle setLoading', () => {
    const actual = tasksReducer(initialState, setLoading(true));
    expect(actual.loading).toEqual(true);
  });

  it('should handle setError', () => {
    const error = 'Test error';
    const actual = tasksReducer(initialState, setError(error));
    expect(actual.error).toEqual(error);
  });
}); 