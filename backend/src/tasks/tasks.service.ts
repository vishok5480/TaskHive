import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel
      .find({ completed: false })
      .sort({ priority: 1, dueDate: 1 })
      .exec();
  }

  async create(createTaskDto: Partial<Task>): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async complete(id: string): Promise<void> {
    await this.taskModel.findByIdAndUpdate(id, { completed: true });
  }

  async update(id: string, updateData: Partial<Task>): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, updateData, { new: true });
  }
}
