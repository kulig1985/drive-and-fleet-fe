import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TriggerService {


  private triggerOpenNewOrderPopupSubject = new Subject<void>();
  private triggerSearchTextChangedSubject = new Subject<string>();

  triggerOpenNewOrderPopupFunctionObservable = this.triggerOpenNewOrderPopupSubject.asObservable();
  triggerSearchTextChangedFunctionObservable = this.triggerSearchTextChangedSubject.asObservable();
  constructor() { }


  triggerOpenNewOrderPopup(): void {
    this.triggerOpenNewOrderPopupSubject.next();
  }

  triggerSearchTextChanged(newValue: string): void {
    this.triggerSearchTextChangedSubject.next(newValue);
  }


}
