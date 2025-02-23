import { Component } from '@angular/core';

import { Task } from '@take-home/shared';
import { take } from 'rxjs';
import { TasksService } from '../tasks.service';
import { Router } from '@angular/router';
import { StorageService } from '../../storage/storage.service';

@Component({
  selector: 'take-home-list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: false,
})
export class ListComponent {
  constructor(
    private storageService: StorageService,
    protected tasksService: TasksService,
    private router: Router,
  ) {
    this.getTaskList();
  }

  onDoneTask(item: Task): void {
    // TODO: mark as completed
    item.completed = true;
    // TODO: save updated task to storage
    this.storageService.updateTaskItem(item);
    // throw new Error('Not implemented');
  }

  onDeleteTask(item: Task): void {
    const confirm: boolean = window.confirm('Do you want to delete this task?');
    if (!confirm) {
      return;
    }
    // TODO: mark as archived
    item.isArchived = true;
    // TODO: save updated task to storage
    this.storageService.updateTaskItem(item);
    // TODO: refresh list without archived items
    this.getTaskList();

    // throw new Error('Not implemented');
  }

  onAddTask(): void {
    // TODO: navigate to add task
    this.router.navigate(['/add']);
    // throw new Error('Not implemented');
  }

  private getTaskList(): void {
    this.tasksService
      .getTasksFromApi()
      .pipe(take(1))
      .subscribe(async (tasks) => {
        tasks.forEach(async (task) => {
          await this.storageService.updateTaskItem(task);
        });
        await this.tasksService.getTasksFromStorage();
      });
  }
}
