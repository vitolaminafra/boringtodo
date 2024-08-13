import { Component, Input } from '@angular/core';
import { Task } from '../../model/task';
import { TaskViewComponent } from '../task-view/task-view.component';
import { DividerModule } from 'primeng/divider';
import { NgIf } from '@angular/common';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-tasks-section',
  standalone: true,
  imports: [TaskViewComponent, DividerModule, NgIf],
  templateUrl: './tasks-section.component.html',
  styleUrl: './tasks-section.component.css',
})
export class TasksSectionComponent {
  @Input() taskData: Task[] = [];
  constructor(private taskService: TaskService) {}

  saveTask() {
    this.taskService.saveLocalTasks(this.taskData);
  }
}
