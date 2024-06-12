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
import {Model} from "survey-core";
import {newOrderDesc} from "./new-order-desc";


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
        SurveyModule
    ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{

    model: Model;
    constructor() {
    }
    ngOnInit(): void {

        const survey = new Model(newOrderDesc);

        survey.onComplete.add((sender, options) => {
            const baseSenderData = sender.data;
            console.log('baseSenderData:', baseSenderData)
        });

        survey.onValueChanged.add((sender, options) => {
            if (options.name === 'rideCnt') {
                console.log('rideCnt changed sender', sender.pages)
                console.log('rideCnt changed options', options)

                const rideCnt = options.value;
                const page = sender.pages[3];
                console.log("page", page)
                let rideCntElement = page.getElementByName("rideCnt")
                console.log("rideCntElement", rideCntElement)

                for (let i = 0; i < rideCnt; i++) {
                    page.addNewQuestion('text', `orderName${i}`)
                        .title = 'Megrendelés neve';
                    page.getQuestionByName(`orderName${i}`).isRequired = true;
                    page.getQuestionByName(`orderName${i}`).requiredErrorText = 'Add meg a megrendelés nevét!';


                }
            }
        });

        this.model = survey;

    }



}
