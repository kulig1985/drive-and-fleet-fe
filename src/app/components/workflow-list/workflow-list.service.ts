import { Injectable } from '@angular/core';
import {WorkflowModel} from "../../model/workflow-model";
import {mockWorkflowList} from "../../model/mock-data";


@Injectable({
  providedIn: 'root'
})
export class WorkflowListService {

  constructor() { }

  getWorkflow() : WorkflowModel[] {
    return mockWorkflowList;
  }
}
