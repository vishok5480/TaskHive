import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';

describe('TasksService', () => {
  let service: TasksService;
  let mockTaskModel;

  const mockTask = {
    title: 'Test Task',
    description: 'Test Description',
    priority: 'high' as 'high' | 'medium' | 'low',
    dueDate: '2024-03-20',
  };

  beforeEach(async () => {
    mockTaskModel = {
      new: jest.fn().mockResolvedValue({
        save: () => mockTask
      }),
      find: jest.fn(),
      create: jest.fn().mockResolvedValue(mockTask),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  describe('create', () => {
    it('should create a task', async () => {
      const result = await service.create(mockTask);
      expect(result).toEqual(mockTask);
      expect(mockTaskModel.create).toHaveBeenCalledWith(mockTask);
    });
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const mockTasks = [mockTask];
      mockTaskModel.find.mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockTasks),
      });

      const result = await service.findAll();
      expect(result).toEqual(mockTasks);
    });
  });
}); 