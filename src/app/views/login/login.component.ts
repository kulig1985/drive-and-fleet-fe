import {Component, OnInit} from '@angular/core';
import {CommonModule, NgStyle} from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    ButtonDirective,
    AlertComponent, NavLinkDirective
} from '@coreui/angular';
import {AuthService} from "../../auth/auth.service";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {map} from "rxjs/operators";
import {DxLoadIndicatorModule} from "devextreme-angular";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [CommonModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, FormsModule, AlertComponent, NavLinkDirective, RouterLink, RouterLinkActive, DxLoadIndicatorModule]
})
export class LoginComponent implements OnInit{

    driverPass: string;
    driverName: string;
    loginError= false;
    loaderVisible = false;

  constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.authService.isLoggedIn().subscribe(
            {
                next : (isloggedResult : any) => {
                    if (isloggedResult) {
                        this.router.navigate(['/home/work-order']);
                    }
                },
                error : (error : any) => {
                    console.error('login error: ', error)
                }
            })
    }


    signIn() {
      console.log('driverPass', this.driverPass, 'driverName', this.driverName);
        this.loaderVisible = true;
        this.authService.signIn(this.driverPass, this.driverName).subscribe(
            {
                next : (jwtObject : any) => {
                    console.log('jwtObject', jwtObject);

                        localStorage.setItem("jwt", jwtObject.jwt);
                        this.loaderVisible = false;
                        this.router.navigate(['/home/work-order']);

                },
                error : (error : any) => {
                    console.error('generateJwt ERROR: ', error)
                    this.loaderVisible = false;
                    this.loginError = true;
                }
            })

    }

}
