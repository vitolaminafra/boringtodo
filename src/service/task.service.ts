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

    return sampleDataArray.sort(this.dateSort);
  }

  dateSort(a: Task, b: Task) {
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

      return taskData.sort(this.dateSort);
    } else {
      return [];
    }
  }
}
