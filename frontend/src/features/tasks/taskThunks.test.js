import { fetchTasks } from './taskThunks';
import { setTasks, setLoading } from './tasksSlice';

describe('task thunks', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch tasks successfully', async () => {
    const mockTasks = [
      { _id: '1', title: 'Task 1' },
      { _id: '2', title: 'Task 2' }
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockTasks)
    });

    const thunk = fetchTasks();
    await thunk(dispatch);

    // Check all dispatch calls
    const calls = dispatch.mock.calls;
    
    // First call should be pending
    expect(calls[0][0].type).toBe('tasks/fetchTasks/pending');
    
    // Second call should be setLoading(true)
    expect(calls[1][0]).toEqual(setLoading(true));
    
    // Third call should be setTasks with mockTasks
    expect(calls[2][0]).toEqual(setTasks(mockTasks));
    
    // Fourth call should be setLoading(false)
    expect(calls[3][0]).toEqual(setLoading(false));
    
    // Fifth call should be fulfilled
    expect(calls[4][0].type).toBe('tasks/fetchTasks/fulfilled');
  });

  it('should handle fetch error', async () => {
    const errorMessage = 'Failed to fetch';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    const thunk = fetchTasks();
    await thunk(dispatch);

    const calls = dispatch.mock.calls;

    // First call should be pending
    expect(calls[0][0].type).toBe('tasks/fetchTasks/pending');
    
    // Second call should be setLoading(true)
    expect(calls[1][0]).toEqual(setLoading(true));
    
    // Third call should be setError
    expect(calls[2][0].type).toBe('tasks/setError');
    
    // Fourth call should be setLoading(false)
    expect(calls[3][0]).toEqual(setLoading(false));
    
    // Fifth call should be rejected
    expect(calls[4][0].type).toBe('tasks/fetchTasks/rejected');
  });
}); 