import { Component, EventEmitter, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgClass } from '@angular/common';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [Button, DividerModule, TooltipModule, OverlayPanelModule, NgClass],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  @Output() loadSampleDataEmitter = new EventEmitter();
  @Output() deleteAllEmitter = new EventEmitter();
  @Output() loadDataEmitter = new EventEmitter();

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    protected taskService: TaskService,
  ) {}

  loadSampleData() {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to load sample data? All current tasks will be deleted.',
      header: 'Load sample data confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-rounded',
      rejectButtonStyleClass: 'p-button-text p-button-rounded dark-text',
      acceptIcon: 'pi pi-database mr-2',
      rejectIcon: 'pi pi-times mr-2',
      accept: () => {
        this.loadSampleDataEmitter.emit();
        this.messageService.add({
          severity: 'success',
          summary: 'Loaded',
          detail: 'Loaded sample data.',
        });
      },
    });
  }

  deleteAll() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this all tasks?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-rounded',
      rejectButtonStyleClass: 'p-button-text p-button-rounded dark-text',
      acceptIcon: 'pi pi-trash mr-2',
      rejectIcon: 'pi pi-times mr-2',
      accept: () => {
        this.deleteAllEmitter.emit();
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'All tasks have been deleted.',
        });
      },
    });
  }

  orderChanged() {
    this.taskService.saveOrder();
    this.loadDataEmitter.emit();
  }
}
