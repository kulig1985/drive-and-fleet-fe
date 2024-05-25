import { Routes } from '@angular/router';
import {WorkflowListComponent} from "./components/workflow-list/workflow-list.component";
import {RideSurveyComponent} from "./components/ride-survey/ride-survey.component";
import {AdminComponent} from "./components/admin/admin.component";


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'workflow-list' },
  {
    path:'ride-survey',
    component:RideSurveyComponent,
    data : {title:'Ride-Survey', side: false},
    children : []
  },
  {
    path:'workflow-list',
    component:WorkflowListComponent,
    data : {title:'Workflow-List', side: false},
    children : []
  },
  {
    path:'admin',
    component:AdminComponent,
    data : {title:'Admin', side: false},
    children : []
  },
];
