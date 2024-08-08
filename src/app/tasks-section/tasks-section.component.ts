import {Component, Input} from '@angular/core';
import { Task } from '../../model/task';
import {TaskViewComponent} from "../task-view/task-view.component";
import {DividerModule} from "primeng/divider";

@Component({
  selector: 'app-tasks-section',
  standalone: true,
  imports: [
    TaskViewComponent,
    DividerModule
  ],
  templateUrl: './tasks-section.component.html',
  styleUrl: './tasks-section.component.css'
})
export class TasksSectionComponent {
  @Input() taskData: Task[] = [];

}
