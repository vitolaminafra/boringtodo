import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../model/task';
import { formatDate, NgClass, NgIf } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { Button } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import confetti from 'canvas-confetti';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SubTask } from '../../model/sub-task';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [
    DividerModule,
    NgClass,
    Button,
    TooltipModule,
    NgIf,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css',
})
export class TaskViewComponent {
  @Input() task!: Task;
  @Output() editedTaskEmitter = new EventEmitter();

  private _editMode: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  checkIfDueToday(dueDate: Date) {
    const today = formatDate(new Date(), 'dd MMMM yyyy', 'en-US');

    const todayDate = new Date();
    const taskDate = new Date(dueDate);

    if (taskDate.setHours(0, 0, 0, 0) == todayDate.setHours(0, 0, 0, 0)) {
      return 'Due today';
    } else {
      return formatDate(taskDate, 'dd MMMM yyyy', 'en-US');
    }
  }

  markAsCompleted(task: any) {
    if (task.isCompleted) {
      task.isCompleted = !task.isCompleted;
    } else {
      task.isCompleted = true;
      confetti();
    }

    this.editedTaskEmitter.emit();
  }

  get editMode() {
    return this._editMode;
  }

  set editMode(value: boolean) {
    this._editMode = value;
    if (!value) {
      this.editedTaskEmitter.emit();
    }
  }

  deleteTask() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this tasks and all sub tasks?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-rounded',
      rejectButtonStyleClass: 'p-button-text p-button-rounded dark-text',
      acceptIcon: 'pi pi-trash mr-2',
      rejectIcon: 'pi pi-times mr-2',
      accept: () => {
        this.task.isDeleted = true;
        this.editedTaskEmitter.emit();
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'This task has been deleted.',
        });
      },
    });
  }

  deleteSubTask(subTask: SubTask) {
    subTask.isDeleted = true;
    this.editedTaskEmitter.emit();
  }
}
