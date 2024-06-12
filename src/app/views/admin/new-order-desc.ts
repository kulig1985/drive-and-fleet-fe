export const newOrderDesc = {
    pages: [
        {
            "name": "Partner",
            elements: [
                {
                    "type": "dropdown",
                    "name": "partnerName",
                    "title": "Partner neve",
                    "isRequired": true,
                    "showNoneItem": true,
                    "showOtherItem": true,
                    "choices": ["MOL fleet", "Arval", "Ayvens", "Más"],
                    "requiredErrorText": "Add meg a partner nevét!"
                }
            ],
        },
        {
            "name": "Megrendelés neve",
            elements: [
                {
                    "name": "orderName",
                    "type": "text",
                    "title": "Megrendelés neve",
                    "inputType": "text",
                    "isRequired": true,
                    "requiredErrorText": "Add meg a megrendelés nevét!"
                }
            ],
        },
        {
            "name": "Autok darabszáma?",
            elements: [
                {
                    "name": "carCnt",
                    "type": "text",
                    "title": "Autok darabszáma?",
                    "inputType": "number",
                    "min": 0,
                    "max": 20,
                    "defaultValue": 1,
                    "isRequired": true,
                    validators: [{
                        "type": "numeric",
                        "text": "Autok darabszáma 1-20 közötti érték lehet.",
                        "minValue": 1,
                        "maxValue": 20
                    }]
                }
            ]
        },
        {
            "name": "Fuvarok darabszáma?",
            elements: [
                {
                    "name": "rideCnt",
                    "type": "text",
                    "title": "Fuvarok darabszáma?",
                    "inputType": "number",
                    "min": 0,
                    "max": 20,
                    "defaultValue": 0,
                    "isRequired": true,
                    validators: [{
                        "type": "numeric",
                        "text": "Fuvarok darabszáma 1-20 közötti érték lehet.",
                        "minValue": 1,
                        "maxValue": 20
                    }],
                },
            ],
        }
    ]
};
