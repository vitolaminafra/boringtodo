import { Injectable } from '@angular/core';

import sampleData from '../../assets/sample.json';
import {Task} from "../model/task";


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  sampleDate() {
    const sampleDataArray =  sampleData as unknown as Task[];
    return sampleDataArray.sort(this.dateSort)
  }

   dateSort(a: Task, b: Task) {
    return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
  }
}
