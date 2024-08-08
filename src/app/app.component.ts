import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TopBarComponent} from "./top-bar/top-bar.component";
import {TasksSectionComponent} from "./tasks-section/tasks-section.component";
import {TaskService} from "../service/task.service";
import {Task} from "../model/task";
import '@angular/common/locales/global/it';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, TasksSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'boringtodo';

  taskData: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskData = this.taskService.sampleDate();
  }
}
