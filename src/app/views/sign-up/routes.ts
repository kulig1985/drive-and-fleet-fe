import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./sign-up.component').then(m => m.SignUpComponent),
        data: {
            title: $localize`sign-up`
        }
    }
];
