import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./logout.component').then(m => m.LogoutComponent),
        data: {
            title: $localize`Logout`
        }
    }
];
