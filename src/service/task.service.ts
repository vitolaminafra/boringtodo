import { Injectable } from '@angular/core';

import sampleData from '../../assets/sample.json';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  sampleDate() {
    const sampleDataArray = sampleData as unknown as Task[];
    this.saveLocalTasks(sampleDataArray);

    console.log('loaded sample data');

    return sampleDataArray.sort(
      this.getOrder() == 'ASC' ? this.ascSort : this.descSort,
    );
  }

  ascSort(a: Task, b: Task) {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  }

  descSort(a: Task, b: Task) {
    return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
  }

  saveLocalTasks(tasks: Task[]) {
    console.log('saved local tasks', tasks);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  loadLocalTasks() {
    if (localStorage.getItem('tasks') != null) {
      const taskData = JSON.parse(localStorage.getItem('tasks') as string);

      console.log('loaded sample data', taskData);

      return taskData.sort(
        this.getOrder() == 'ASC' ? this.ascSort : this.descSort,
      );
    } else {
      return [];
    }
  }

  saveOrder() {
    localStorage.setItem(
      'order',
      localStorage.getItem('order') == 'ASC' ? 'DESC' : 'ASC',
    );
  }

  getOrder() {
    return localStorage.getItem('order');
  }
}
