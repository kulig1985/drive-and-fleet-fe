import { Routes } from '@angular/router';
import {WorkflowListComponent} from "./components/workflow-list/workflow-list.component";
import {RideSurveyComponent} from "./components/ride-survey/ride-survey.component";
import {AdminComponent} from "./components/admin/admin.component";
import {DefaultLayoutComponent} from "./layout";
import {LoginComponent} from "./views/login/login.component";
import {authGuard} from "./auth/auth.guard";
import {LogoutComponent} from "./views/logout/logout.component";
import {SignUpComponent} from "./views/sign-up/sign-up.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    },
    children: [
    ]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    data: {
      title: 'Sign-up'
    },
    children: [
    ]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout'
    },
    children: [
    ]
  },
  {
    path: 'home',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'work-order',
        canActivate: [authGuard],
        loadChildren: () => import('./views/work-order/routes').then((m) => m.routes)
      },
      {
        path: 'admin',
        canActivate: [authGuard],
        loadChildren: () => import('./views/admin/routes').then((m) => m.routes)
      },
      {
        path: 'survey',
        canActivate: [authGuard],
        loadChildren: () => import('./views/survey/routes').then((m) => m.routes)
      },
      {
        path: 'view-ride',
        canActivate: [authGuard],
        loadChildren: () => import('./views/view-ride/routes').then((m) => m.routes)
      },
    ]
  }
];
