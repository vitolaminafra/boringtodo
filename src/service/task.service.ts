import { Injectable } from '@angular/core';

import sampleData from '../../assets/sample.json';
import {Task} from "../model/task";


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  sampleDate() {
    return sampleData as unknown as Task[];
  }
}
