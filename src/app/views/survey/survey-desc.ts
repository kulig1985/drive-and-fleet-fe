export const surveyDesc ={
    //title:"Jegyzőkönyv",
    pages:[
        {
            "name":"Km óra állás",
            elements:[
                {
                    "name":"kmAmount",
                    "type":"text",
                    "title":"Km óra állás?",
                    "inputType":"number",
                    "min":0,
                    "max":500000,
                    "defaultValue":0,
                    "isRequired":true,
                    validators: [{
                        "type": "numeric",
                        "text": "A km ór állás 1 és 500000 közötti érték lehet",
                        "minValue": 1,
                        "maxValue": 500000
                    }]
                }
            ]
        },
        {
            name:"Üzemanyag",
            elements:[
                {
                    "type":"radiogroup",
                    "name":"fuelLevel",
                    "title":"Üzemanyag szint?",
                    "choices":[
                        "0",
                        "1/4",
                        "1/2",
                        "3/4",
                        "1"
                    ],
                    "isRequired":true,
                    "colCount":2,
                    "showNoneItem":true,
                    //"showOtherItem":true,
                    "showSelectAllItem":true,
                    "separateSpecialChoices":true,
                    "requiredErrorText": "Add meg az üzemanyag szintet!"
                }
            ]
        },
        {
            name:"Tartozék",
            elements:[
                {
                    "type":"checkbox",
                    "name":"equipmentsList",
                    "title":"Okmányok tartozékok?",
                    "choices":[
                        "dísztárcsa",
                        "forgalmi",
                        "kerékőr",
                        "szervizfüzet",
                        "indítókulcs"
                    ],
                    "isRequired":true,
                    "colCount":2,
                    "showNoneItem":true,
                    "showOtherItem":true,
                    "showSelectAllItem":true,
                    "separateSpecialChoices":true,
                    "requiredErrorText": "Add meg a tartozákokat!",
                    validators: [{
                        "type": "answercount",
                        "minCount": 1,
                    }]
                }
            ]
        },
        {
            name:"Fényképek",
            elements:[
                {
                    "type":"file",
                    "title":"Please upload your files",
                    "name":"uploadedFiles",
                    "storeDataAsText":false,
                    "waitForUpload":true,
                    "allowMultiple":true,
                    "maxSize":102400000,
                    "hideNumber":true,
                    "isRequired":true,
                    "requiredErrorText": "Tölts fel fényképeket!",
                }
            ]
        },
        {
            name: "Aláírás",
            elements: [
                {
                    "type": "signaturepad",
                    "name": "signature",
                    "title": "Aláírás",
                    "isRequired": true,
                    "storeDataAsText": false,
                    "waitForUpload": true,
                    "signatureWidth": 600,
                    "penColor": "#2D4760",
                    "requiredErrorText": "Add meg az aláírást!",
                }
            ]
        }
    ]
}
