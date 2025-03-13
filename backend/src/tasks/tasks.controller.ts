import { Controller, Get, Post, Body, Put, Param, NotFoundException, ValidationPipe, Delete, Query, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Query('search') search?: string) {
    return this.tasksService.findAll(search);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    console.log('Updating task:', id, updateTaskDto); // Debug log
    return this.tasksService.update(id, updateTaskDto);
  }

  @Patch(':id/complete')
  async complete(@Param('id') id: string, @Body() body: { completed: boolean }): Promise<Task> {
    console.log('Completing task:', id, body); // Debug log
    try {
      const task = await this.tasksService.update(id, { completed: body.completed });
      console.log('Updated task:', task); // Debug log
      return task;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
