import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {WorkOrderDTO} from "../views/work-order/dto/new-work-order-dto";
import {DriverModificationDto} from "../views/work-order/dto/driver-modification.dto";



@Injectable({
  providedIn: 'root',
})
export class DaoService {

  constructor(private httpClient: HttpClient) { }

  findAllWorkOrder() {
    return this.httpClient.get(environment.workOrderList);
  }

  findAllValidPartner() {
    return this.httpClient.get(environment.findAllValidPartner);
  }

  findAllDriver() {
    return this.httpClient.get(environment.findAllDriver);
  }

  saveNewWorkOrder(workOrderDTO: WorkOrderDTO) {
    return this.httpClient.post(environment.saveNewWorkOrder, workOrderDTO);
  }

  modifyWorkOrder(workOrderDTO: WorkOrderDTO) {
    return this.httpClient.patch(environment.modifyWorkOrder, workOrderDTO);
  }

  findRideById(rideId : number){
    let params = new HttpParams().set('rideId', rideId);
    return this.httpClient.get(environment.findRideById, {params: params})
  }

  findAllRide() {
    return this.httpClient.get(environment.findAllRide);
  }

  modifyDriverForRide(driverModificationDto: DriverModificationDto) {
    return this.httpClient.patch(environment.modifyDriverForRide, driverModificationDto);
  }

}
