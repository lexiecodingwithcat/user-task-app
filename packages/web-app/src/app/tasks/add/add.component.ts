import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task, TaskPriority } from '@take-home/shared';
import { StorageService } from '../../storage/storage.service';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'take-home-add-component',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  standalone: false,
})
export class AddComponent {
  public minDate: Date = new Date();
  public maxDate: Date = new Date(
    new Date().setDate(this.minDate.getDate() + 7),
  );

  public addTaskForm: FormGroup = new FormGroup({
    title: new FormControl(null, {
      // TODO: add validators for required and min length 10
      validators: [Validators.required, Validators.minLength(10)],
    }),
    description: new FormControl(null),
    priority: new FormControl(
      { value: TaskPriority.MEDIUM, disabled: false },
      {
        validators: Validators.required,
      },
    ),
    scheduledDate: new FormControl(new Date(), {
      validators: [Validators.required],
    }),
  });
  protected priorities = Object.values(TaskPriority);

  constructor(private storageService: StorageService, private router: Router) {}

  async onSubmit() {
    try {
      const newTask: Task = {
        ...this.addTaskForm.getRawValue(),
        uuid: faker.string.uuid(),
        isArchived: false,
        // TODO: allow user to set scheduled date using MatDatePicker
        // scheduledDate: new Date(),
      };
      // TODO: save updated task to storage
      this.storageService.addTaskItem(newTask);
      // TODO: navigate to home page
      this.router.navigateByUrl('/');
    } catch (err) {
      console.log('Error when submiting the form:', err);
    }
    // throw new Error('Not implemented');
  }

  onCancel(): void {
    // TODO: navigate to home page
    this.router.navigateByUrl('/');
    // throw new Error('Not implemented');
  }
}
