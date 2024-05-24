import {Component, OnInit} from '@angular/core';
import { Model } from "survey-core";
import {CommonModule} from "@angular/common";
import {SurveyModule} from "survey-angular-ui";
import {ActivatedRoute, RouterLink} from "@angular/router";

const json = {
  elements: [{
    "name": "kmAmount",
    "type": "text",
    "title": "Km óra állás?",
    "inputType": "number",
    "min": 0,
    "max": 500000,
    "defaultValue": 0,
    "isRequired": true
  },
    {
      "type": "radiogroup",
      "name": "fuelLevel",
      "title": "Üzemanyag szint?",
      "choices": [ "0", "1/4", "1/2", "3/4", "1"],
      "isRequired": true,
      "colCount": 2,
      "showNoneItem": true,
      "showOtherItem": true,
      "showSelectAllItem": true,
      "separateSpecialChoices": true
    },
    {
      "type": "checkbox",
      "name": "equipmentsList",
      "title": "Okmányok tartozékok?",
      "choices": [ "dísztárcsa", "forgalmi", "kerékőr", "szervizfüzet", "indítókulcs"],
      "isRequired": true,
      "colCount": 2,
      "showNoneItem": true,
      "showOtherItem": true,
      "showSelectAllItem": true,
      "separateSpecialChoices": true
    },
    {
      "type": "file",
      "title": "Please upload your files",
      "name": "uploadedFiles",
      "storeDataAsText": false,
      "waitForUpload": true,
      "allowMultiple": true,
      "maxSize": 102400,
      "hideNumber": true
    }
  ]
};

@Component({
  selector: 'app-ride-survey',
  standalone: true,
  imports: [CommonModule, SurveyModule, RouterLink],
  templateUrl: './ride-survey.component.html',
  styleUrl: './ride-survey.component.scss'
})
export class RideSurveyComponent implements OnInit{

  selectedWorkflow: string | null = '';
  selectedRide: string | null = '';

  constructor(private route: ActivatedRoute) {
  }

  model: Model;
  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      this.selectedWorkflow = params.get('wfId');
      this.selectedRide = params.get('rideId');
    });

    const survey = new Model(json);

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
      options.showSaveInProgress();
      console.log('onComplete options', options);
      console.log('onComplete model.data', sender.data);
      const questionsToUpload = Object.keys(tempFileStorage);
      console.log('questionsToUpload', questionsToUpload);

    });
    /*
    survey.onComplete.add((model, options) => {
      console.log('onComplete 2')
      console.log(model.data);
    });
    */
    this.model = survey;
  }



}
