import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./work-order.component').then(m => m.WorkOrderComponent),
        data: {
            title: $localize`Megrendelések`
        }
    }
];
