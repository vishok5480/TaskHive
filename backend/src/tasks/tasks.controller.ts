import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.interface';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() createTaskDto: { title: string; description: string; priority: 'low' | 'medium' | 'high'; dueDate: string }): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.tasksService.complete(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: { title: string; description: string; priority: 'low' | 'medium' | 'high'; dueDate: string }
  ) {
    return this.tasksService.update(+id, updateTaskDto);
  }
}
