import { Routes } from '@angular/router';
import {SurveyComponent} from "survey-angular-ui";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./survey.component').then(m => m.SurveyComponent),
        data: {
            title: $localize`Jegyzőkönyv`
        }
    }
];
