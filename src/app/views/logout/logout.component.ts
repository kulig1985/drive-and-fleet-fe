import { Component } from '@angular/core';
import {
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent, NavLinkDirective,
  RowComponent
} from "@coreui/angular";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    CardComponent,
    CardBodyComponent,
    NavLinkDirective,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  constructor() {
    localStorage.removeItem("jwt");
  }

}
