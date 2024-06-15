import { Pipe, PipeTransform } from '@angular/core';
import {WorkOrderDTO} from "./dto/new-work-order-dto";

@Pipe({
  name: 'plateFilter',
  standalone: true
})
export class PlateFilterPipe implements PipeTransform {

  transform(workOrderList: any[], filter: string): any[] {
    const filterValue = filter.toLowerCase();
    console.log('transform',filterValue )
    return workOrderList.filter(workOrder => workOrder.plateNr?.toLowerCase().includes(filterValue));
  }

}
