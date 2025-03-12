import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.schema';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() createTaskDto: Partial<Task>): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id/complete')
  async complete(@Param('id') id: string) {
    await this.tasksService.complete(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: Partial<Task>
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }
}
