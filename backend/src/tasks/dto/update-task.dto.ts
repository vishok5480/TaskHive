import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto {
  readonly title?: string;
  readonly description?: string;
  readonly priority?: 'low' | 'medium' | 'high';
  readonly dueDate?: Date;
  readonly completed?: boolean;
} 