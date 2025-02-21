import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '@take-home/shared';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  listTasks(): Task[] {
    return this.tasksService.getTasks();
  }

  @Post()
  createTask(@Body() newTask: Omit<Task, 'uuid' | 'isArchived'>): Task {
    return this.tasksService.createTask(newTask);
  }
}
