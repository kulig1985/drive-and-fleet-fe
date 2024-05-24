import {Ride} from "./ride-model";

export class WorkflowModel {
  wfId?:               number;
  plateNumber?:        string;
  partnerCompanyName?: string;
  carUserName?:        string;
  carUserPhone?:       string;
  carType?:            string;
  rides?:              Ride[];
  crDate?:             string;
  crUser?:             string;
  modDate?:            string;
  modUser?:            string;
  booldId?:            number;
}
