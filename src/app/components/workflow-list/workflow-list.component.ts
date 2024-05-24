import {Component, OnInit, ViewChild} from '@angular/core';
import DevExpress from "devextreme";
import {CommonModule} from "@angular/common";
import {WorkflowListService} from "./workflow-list.service";
import {DxListComponent, DxListModule} from "devextreme-angular";
import {WorkflowModel} from "../../model/workflow-model";
import {
  MatAccordion, MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {
  NgbAccordionBody,
  NgbAccordionButton, NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-workflow-list',
  standalone: true,
  imports: [CommonModule, MatList, MatListItem, MatAccordion, MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelDescription, MatExpansionModule, MatIconModule, RouterLink, MatListSubheaderCssMatStyler, NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionButton, NgbAccordionCollapse, NgbAccordionBody],
  templateUrl: './workflow-list.component.html',
  styleUrl: './workflow-list.component.scss'
})
export class WorkflowListComponent implements OnInit{

  mockworkflowList: WorkflowModel[];
  panelOpenState = false;
  constructor(workflowListService: WorkflowListService) {
    this.mockworkflowList = workflowListService.getWorkflow();
  }

  ngOnInit(): void {
  }

}
