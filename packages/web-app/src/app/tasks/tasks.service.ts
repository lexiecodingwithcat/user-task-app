import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, scheduled } from 'rxjs';
import { Task, TaskPriority } from '@take-home/shared';
import { StorageService } from '../storage/storage.service';

@Injectable({ providedIn: 'root' })
export class TasksService {
  tasks: Task[] = [];

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {}

  getTasksFromApi(): Observable<Task[]> {
    const endpointUrl = '/api/tasks';
    return this.http.get<Task[]>(endpointUrl);
  }

  async getTasksFromStorage(): Promise<void> {
    this.tasks = await this.storageService.getTasks();
    this.filterTask('isArchived');
  }

  filterTask(key: keyof Task): void {
    switch (key) {
      case 'isArchived':
        this.tasks = this.tasks.filter((task) => !task.isArchived);
        break;
      case 'priority':
        // TODO: add fitler for taks with High Priority
        this.tasks = this.tasks.filter(
          (task) => task.priority == TaskPriority.HIGH,
        );
        break;
      // throw new Error('Not implemented');
      case 'scheduledDate':
        // TODO: add fitler for tasks Due Today
        this.tasks = this.tasks.filter((task) => {
          const dueDate = new Date(task.scheduledDate);
          const today = new Date();
          return (
            today.getFullYear() === dueDate.getFullYear() &&
            today.getMonth() === dueDate.getMonth() &&
            today.getDate() === dueDate.getDate()
          );
        });
        break;
      // throw new Error('Not implemented');
      case 'completed':
        this.tasks = this.tasks.filter((task) => !task.completed);
        break;
    }
  }

  searchTask(search: string): void {
    if (search) {
      // TODO: filter tasks which title include search value
      this.tasks = this.tasks.filter((task) =>
        task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      );
      // throw new Error('Not implemented');
    } else {
      // TODO: reload all tasks from storage
      this.getTasksFromStorage();
      // throw new Error('Not implemented');
    }
  }
}
