import {Component, OnInit} from '@angular/core';
import {
  NavComponent,
  NavLinkDirective,
  TabContentComponent,
  TabContentRefDirective,
  TabPaneComponent
} from "@coreui/angular";
import {RouterLink} from "@angular/router";
import {SurveyModule} from "survey-angular-ui";
import {WorkOrderDTO} from "../work-order/dto/new-work-order-dto";
import {DaoService} from "../../shared/dao.service";
import {DxDataGridModule} from "devextreme-angular";


@Component({
  selector: 'app-admin',
  standalone: true,
    imports: [
        NavComponent,
        TabContentComponent,
        TabPaneComponent,
        NavLinkDirective,
        TabContentRefDirective,
        RouterLink,
        SurveyModule,
        DxDataGridModule
    ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{

    allRidesList: any[];
    constructor(private daoService: DaoService) {
    }
    ngOnInit(): void {
        this.loadAllRide();
    }

    loadAllRide() {

        this.daoService.findAllRide().subscribe({
            next: (findAllRideResult: any) => {
                console.log('findAllRideResult', findAllRideResult)
                this.allRidesList = findAllRideResult;
            },
            error: (error: any) => {
                console.log('findAllRideError', error)

            }
        })

    }


}
