import {Component, Input} from '@angular/core';
import { Task } from '../../model/task';
import {formatDate, NgClass, NgIf} from "@angular/common";
import {DividerModule} from "primeng/divider";
import {Button} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [
    DividerModule,
    NgClass,
    Button,
    TooltipModule,
    NgIf
  ],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent {
  @Input() task!: Task;


  checkIfDueToday(dueDate: Date) {
    const today = formatDate(new Date(), 'dd MMMM yyyy', 'en-US');

    const todayDate = new Date();
    const taskDate = new Date(dueDate);

    if(taskDate.setHours(0,0,0,0) == todayDate.setHours(0,0,0,0)) {
      return 'Due today'
    } else {
      return formatDate(taskDate, 'dd MMMM yyyy', 'en-US');
    }
  }

  markAsCompleted(task: any) {
    if(task.isCompleted) {
      task.isCompleted = !task.isCompleted
    } else {
      task.isCompleted = true;
      confetti();
    }
  }
}
