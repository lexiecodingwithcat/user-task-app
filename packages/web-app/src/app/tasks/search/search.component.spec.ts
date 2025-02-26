import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { SearchComponent } from './search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TasksService } from '../tasks.service';

class MockTasksService {
  searchTask(): void {
    return;
  }
}

describe('SearchComponent', () => {
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [SearchComponent],
      providers: [{ provide: TasksService, useClass: MockTasksService }],
    });

    fixture = TestBed.createComponent(SearchComponent);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(fixture.componentInstance).toBeDefined();
  });
});
