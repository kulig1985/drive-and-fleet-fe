import { Component } from '@angular/core';
import {
  AlertComponent, ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent, FormControlDirective,
  FormDirective, InputGroupComponent, InputGroupTextDirective,
  RowComponent
} from "@coreui/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconDirective} from "@coreui/icons-angular";
import {SignUpDTO} from "./dto/sign-up.dto";
import {DaoService} from "../../shared/dao.service";
import {Router} from "@angular/router";
import {DxLoadIndicatorModule} from "devextreme-angular";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    FormsModule,
    ReactiveFormsModule,
    FormControlDirective,
    IconDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    AlertComponent,
    ButtonDirective,
    DxLoadIndicatorModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  driverName: string = '';
  driverPass: string = '';
  driverMail: string = '';
  driverRealName: string = '';
  loaderVisible = false;

  constructor(private daoService: DaoService,
              private router: Router) {
  }

  signUp() {

    const signUpDto: SignUpDTO = {driverName: this.driverName,
                                  driverPass : this.driverPass,
                                  driverRealName: this.driverRealName,
                                  driverMail: this.driverMail}

    console.log('signUpDto', signUpDto)
    this.loaderVisible = true;
    this.daoService.createUser(signUpDto).subscribe({
      next : (signUpResult : any) => {
        console.log('signUpResult')
        this.loaderVisible = false;
        this.router.navigate(['/home/work-order']);
      },
      error: (error: any) => {
        this.loaderVisible = false;
        console.error('signUpResult error!', error);
    }
    })

  }

}
