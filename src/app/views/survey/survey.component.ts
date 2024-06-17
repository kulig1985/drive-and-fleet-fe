import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SurveyModule} from "survey-angular-ui";
import {Model} from "survey-core";
import * as SurveyTheme from "survey-core/themes";
import {surveyDesc} from "./survey-desc";
import {SurveyService} from "./survey.service";
import {
  ColComponent,
  DropdownItemDirective,
  RowComponent,
  ToastBodyComponent,
  ToastComponent, ToasterComponent, ToasterPlacement,
  ToastHeaderComponent
} from "@coreui/angular";
import {IconDirective} from "@coreui/icons-angular";
import {
  cilArrowLeft,
    cilArrowThickFromRight
} from "@coreui/icons";
import {DxLoadIndicatorModule} from "devextreme-angular";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [
    SurveyModule,
    DropdownItemDirective,
    RouterLink,
    IconDirective,
    RowComponent,
    ColComponent,
    ToastBodyComponent,
    ToastComponent,
    ToastHeaderComponent,
    ToasterComponent,
    DxLoadIndicatorModule,
    NgIf
  ],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss'
})
export class SurveyComponent implements OnInit{

  orderId: number;
  rideId: number;
  model: Model;
  icons = { cilArrowLeft, cilArrowThickFromRight};
  toastVisible = false;
  toastPosition = ToasterPlacement.BottomCenter;
  toastMessage = '';
  isSaving = false;

  constructor(private route: ActivatedRoute,
              private surveyService: SurveyService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = +params['orderId']; // use + to convert to number
      this.rideId = +params['rideId'];   // use + to convert to number
      console.log('Survey orderId:', this.orderId, 'rideId:', this.rideId);
    });

    const survey = new Model(surveyDesc);

    const tempFileStorage : {[index: string]:any} = {}

    // Handles selected files
    survey.onUploadFiles.add((model, options) => {

      tempFileStorage[options.name] = options.files;

      const content: { name: any; type: any; content: string | ArrayBuffer | null; file: any; }[] = [];

      options.files.forEach((file : any) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          content.push({
            name: file.name,
            type: file.type,
            content: fileReader.result,
            file: file
          });

          if (content.length === options.files.length) {
            options.callback(content.map((fileContent: any) => {

              return {
                file: fileContent.file,
                content: fileContent.content
              };

            }))
          }
        }
        fileReader.readAsDataURL(file);
      })

    });

    // Handles file removal
    survey.onClearFiles.add((model, options) => {

      if (options.fileName === null) {
        tempFileStorage[options.name] = [];
        options.callback("success");
        return;
      }

      const tempFiles = tempFileStorage[options.name];

      if (!!tempFiles) {
        const fileInfoToRemove = tempFiles.filter((file : any) => file.name === options.fileName)[0];
        if (fileInfoToRemove) {
          const index = tempFiles.indexOf(fileInfoToRemove);
          tempFiles.splice(index, 1);
        }
      }
      options.callback("success");

    });


    survey.onComplete.add((sender, options) => {
      this.isSaving = true;

      const baseSenderData = sender.data;
      baseSenderData.orderId = this.orderId;
      baseSenderData.rideId = this.rideId;

      options.showDataSaving("Ürlap mentése!")
      options.showSaveInProgress("Ürlap mentése folyamatban..")

      this.surveyService.postSurveyData(baseSenderData).subscribe({
        next: (surveySaveResult : any) => {
          console.log(surveySaveResult);
          this.isSaving = false;
          //this.showToast("Sikeres ürlap mentés!")
          this.router.navigate(['/home/work-order']).then(r => {});
        },
        error: (error: any) => {
          options.showSaveError("Data save error: " + error)
          this.isSaving = false;
        }
      })
    });
    survey.showCompletedPage = false;
    this.model = survey;


  }

  showToast(message: string) {
    this.toastMessage = message;
    this.toastVisible = true;
  }

}
