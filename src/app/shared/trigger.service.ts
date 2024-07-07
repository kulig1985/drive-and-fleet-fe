import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TriggerService {


  private triggerOpenNewOrderPopupSubject = new Subject<void>();
  private triggerSearchTextChangedSubject = new Subject<string>();

  private triggerOwnRideSubject = new Subject<boolean>();
  private triggerClosedRideSubject = new Subject<boolean>();

  triggerOpenNewOrderPopupFunctionObservable = this.triggerOpenNewOrderPopupSubject.asObservable();
  triggerSearchTextChangedFunctionObservable = this.triggerSearchTextChangedSubject.asObservable();

  triggerOwnRideFunctionObservable = this.triggerOwnRideSubject.asObservable();
  triggerClosedRideFunctionObservable = this.triggerClosedRideSubject.asObservable();
  constructor() { }


  triggerOpenNewOrderPopup(): void {
    this.triggerOpenNewOrderPopupSubject.next();
  }

  triggerSearchTextChanged(newValue: string): void {
    this.triggerSearchTextChangedSubject.next(newValue);
  }

  triggerOwnRideValueChanged(newValue: boolean): void {
    this.triggerOwnRideSubject.next(newValue);
  }

  triggerClosedRideValueChanged(newValue: boolean): void {
    this.triggerClosedRideSubject.next(newValue);
  }


}
