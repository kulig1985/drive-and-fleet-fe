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
import {DxDataGridModule, DxLoadIndicatorModule} from "devextreme-angular";
import {DxoExportModule} from "devextreme-angular/ui/nested";
import {NgIf} from "@angular/common";
import * as ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import {saveAs} from "file-saver";


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
        DxDataGridModule,
        DxoExportModule,
        DxLoadIndicatorModule,
        NgIf
    ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{

    allRidesList: any[];
    isLoading = false;
    constructor(private daoService: DaoService) {
        this.onExporting = this.onExporting.bind(this);
    }
    ngOnInit(): void {
        this.loadAllRide();
    }

    loadAllRide() {

        this.isLoading = true;

        this.daoService.findAllRide().subscribe({
            next: (findAllRideResult: any) => {
                console.log('findAllRideResult', findAllRideResult)
                this.allRidesList = findAllRideResult;
                this.isLoading = false;
            },
            error: (error: any) => {
                console.log('findAllRideError', error)

            }
        })

    }


    onExporting(e: any) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Rides');

        exportDataGrid({
            component: e.component,
            worksheet,
            autoFilterEnabled: true,
        }).then(() => {
            workbook.xlsx.writeBuffer().then((buffer: any) => {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'AllRide.xlsx');
            });
        });
    }


}
