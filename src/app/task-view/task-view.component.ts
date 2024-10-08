import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';

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
    CalendarModule,
    OverlayPanelModule,
  ],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css',
})
export class TaskViewComponent implements OnInit {
  @Input() task!: Task;
  @Output() editedTaskEmitter = new EventEmitter();

  private _editMode: boolean = false;
  private _taskDate: Date = new Date();
  private _createSubTaskMode: boolean = false;

  private _subTaskLabel: string = '';

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.taskDate = new Date(this.task.dueDate);
  }

  checkIfDueToday(dueDate: Date) {
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

  get taskDate() {
    return this._taskDate;
  }

  set taskDate(date: Date) {
    this._taskDate = date;
    this.task.dueDate = date;

    this.editedTaskEmitter.emit();
  }

  get createSubTaskMode() {
    return this._createSubTaskMode;
  }

  set createSubTaskMode(value: boolean) {
    this._createSubTaskMode = value;
  }

  get subTaskLabel() {
    return this._subTaskLabel;
  }

  set subTaskLabel(value: string) {
    this._subTaskLabel = value;
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

  deleteNote() {
    this.task.note.text = '';
    this.editedTaskEmitter.emit();
  }

  importantNoteToggle() {
    this.task.note.isImportant = !this.task.note.isImportant;
    this.editedTaskEmitter.emit();
  }

  createNewSubTask() {
    if (this.createSubTaskMode) {
      this.createSubTaskMode = false;

      const text = this.subTaskLabel;

      this.task.subTasks.push(
        new (class implements SubTask {
          isCompleted: boolean = false;
          isDeleted: boolean = false;
          label: string = text;
        })(),
      );

      this.editedTaskEmitter.emit();
    } else {
      this.createSubTaskMode = true;
      this.subTaskLabel = '';
    }
  }
}
