import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {TopBarComponent} from "./top-bar/top-bar.component";
import {TasksSectionComponent} from "./tasks-section/tasks-section.component";
import {TaskService} from "../service/task.service";
import {Task} from "../model/task";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DividerModule} from "primeng/divider";
import {NgIf} from "@angular/common";
import {ScrollTopModule} from "primeng/scrolltop";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, TasksSectionComponent, ToastModule, ConfirmDialogModule, DividerModule, NgIf, ScrollTopModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService, ConfirmationService]
})
export class AppComponent implements OnInit {
  title = 'boringtodo';

  taskData: Task[] = [];

  constructor(private taskService: TaskService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.taskData = this.taskService.loadLocalTasks();
  }

  loadSampleData() {
    this.taskData = [];
    this.taskData = this.taskService.sampleDate();

  }

  deleteAll() {
    this.taskData = [];
    this.taskService.saveLocalTasks(this.taskData);
  }
}
