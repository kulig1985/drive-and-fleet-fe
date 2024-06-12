import { Routes } from '@angular/router';
import {SurveyComponent} from "survey-angular-ui";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./view-ride.component').then(m => m.ViewRideComponent),
        data: {
            title: $localize`Fuvar adatok`
        }
    }
];
