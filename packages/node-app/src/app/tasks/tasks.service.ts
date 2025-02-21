import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Task, TaskPriority, generateTask } from '@take-home/shared';
import { TASKS_STORE_DI_TOKEN } from './tasks.store';
import { tasksStore } from './tasks.store';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASKS_STORE_DI_TOKEN)
    private tasksStore: Task[],
  ) {}

  getTasks(): Task[] {
    return this.tasksStore;
  }

  createTask(newTask: Omit<Task, 'uuid' | 'isArchived'>): Task {
    // validate title length
    if (newTask.title.length < 10) {
      throw new BadRequestException(
        'Title must be at least 10 characters long.',
      );
    }
    //create a new task
    const Task: Task = {
      uuid: tasksStore.length.toString(),
      title: newTask.title,
      completed: false,
      description: newTask.description,
      priority: newTask.priority,
      isArchived: false,
      scheduledDate: new Date(),
    };
    this.tasksStore.push(Task);
    return Task;
  }
}
