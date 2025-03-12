import { Injectable } from '@nestjs/common';
import { Task } from './task.interface';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Sample Task 1',
      description: 'This is a sample task',
      completed: false,
      priority: 'high',
      dueDate: '2024-03-20'
    },
    {
      id: 2,
      title: 'Sample Task 2',
      description: 'This is another sample task',
      completed: false,
      priority: 'low',
      dueDate: '2024-03-25'
    }
  ];

  findAll(): Task[] {
    const priorityWeight = {
      'high': 1,
      'medium': 2,
      'low': 3
    };

    return [...this.tasks]
      .filter(task => !task.completed)
      .sort((a, b) => {
        // First sort by priority
        const priorityDiff = priorityWeight[a.priority] - priorityWeight[b.priority];
        if (priorityDiff !== 0) return priorityDiff;
        
        // Then sort by due date
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  }

  create(createTaskDto: { 
    title: string; 
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
  }): Task {
    const newTask = {
      id: Math.max(0, ...this.tasks.map(t => t.id)) + 1,
      ...createTaskDto,
      completed: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  complete(id: number): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = true;
    }
  }

  update(id: number, updateData: Partial<Task>): Task {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      Object.assign(task, updateData);
      return task;
    }
    throw new Error('Task not found');
  }
}
