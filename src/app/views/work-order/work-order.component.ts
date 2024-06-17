import {Component, OnInit, ViewChild} from '@angular/core';
import {
    AccordionButtonDirective,
    AccordionComponent,
    AccordionItemComponent, AlertComponent, BadgeComponent, BorderDirective,
    ButtonCloseDirective,
    ButtonDirective, ButtonGroupComponent,
    CardBodyComponent,
    CardComponent,
    CardFooterComponent,
    CardHeaderComponent,
    CardTextDirective,
    CardTitleDirective,
    ColComponent,
    CollapseDirective,
    ContainerComponent,
    DropdownComponent,
    DropdownItemDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    FormControlDirective,
    FormDirective,
    FormFloatingDirective,
    FormLabelDirective,
    FormTextDirective,
    GutterDirective, InputGroupComponent, InputGroupTextDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalToggleDirective,
    NavbarBrandDirective,
    NavbarComponent,
    NavbarNavComponent,
    NavbarTogglerDirective,
    NavComponent,
    NavItemComponent,
    NavLinkDirective,
    RowComponent,
    SpinnerComponent,
    TemplateIdDirective,
    ToastBodyComponent,
    ToastComponent,
    ToasterComponent, ToasterPlacement,
    ToastHeaderComponent,
    WidgetStatFComponent
} from "@coreui/angular";
import {DaoService} from "../../shared/dao.service";
import {CommonModule, DatePipe, NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {IconDirective} from "@coreui/icons-angular";
import {
    cilArrowBottom,
    cilArrowRight,
    cilArrowTop,
    cilCarAlt,
    cilChartPie,
    cilCheck,
    cilPlus,
    cilSpeedometer,
    cilReload,
    cilOptions,
    cilClipboard,
    cilFilter
} from "@coreui/icons";
import {
    DxAccordionComponent,
    DxAccordionModule,
    DxButtonModule,
    DxFormComponent,
    DxFormModule,
    DxLoadIndicatorModule,
    DxPopupModule,
    DxScrollViewComponent,
    DxScrollViewModule,
    DxTabPanelModule,
} from "devextreme-angular";
import {DxButtonTypes} from "devextreme-angular/ui/button";
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder} from "@angular/forms";
import {DriverDTO, PartnerDTO, RideDTO, WorkOrderDTO} from "./dto/new-work-order-dto";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PlateFilterPipe} from "./plate-filter.pipe";
import {TriggerService} from "../../shared/trigger.service";
import {Subscription} from "rxjs";
import {DriverModificationDto} from "./dto/driver-modification.dto";


@Component({
  selector: 'app-work-order',
  standalone: true,
    imports: [
        AccordionComponent,
        AccordionItemComponent,
        AccordionButtonDirective,
        TemplateIdDirective,
        NgForOf,
        SpinnerComponent,
        ContainerComponent,
        RowComponent,
        ColComponent,
        GutterDirective,
        FormDirective,
        FormLabelDirective,
        FormControlDirective,
        FormTextDirective,
        FormCheckComponent,
        FormCheckInputDirective,
        FormCheckLabelDirective,
        ButtonDirective,
        RouterLink,
        FormFloatingDirective,
        IconDirective,
        DropdownComponent,
        DropdownMenuDirective,
        DropdownItemDirective,
        DropdownToggleDirective,
        NavbarComponent,
        NavbarBrandDirective,
        NavbarTogglerDirective,
        CollapseDirective,
        NavbarNavComponent,
        NavItemComponent,
        NavLinkDirective,
        ModalToggleDirective,
        ModalComponent,
        ModalHeaderComponent,
        ModalTitleDirective,
        ModalBodyComponent,
        DxFormModule,
        DxButtonModule,
        ReactiveFormsModule,
        ModalFooterComponent,
        ButtonCloseDirective,
        DxLoadIndicatorModule,
        DxPopupModule,
        DxScrollViewModule,
        ToasterComponent,
        ToastComponent,
        ToastHeaderComponent,
        ToastBodyComponent,
        NavComponent,
        DxTabPanelModule,
        WidgetStatFComponent,
        CommonModule,
        CardComponent,
        CardBodyComponent,
        CardHeaderComponent,
        CardTitleDirective,
        CardTextDirective,
        CardFooterComponent,
        BorderDirective,
        AlertComponent,
        ButtonGroupComponent,
        InputGroupComponent,
        InputGroupTextDirective,
        PlateFilterPipe,
        FormsModule,
        BadgeComponent,
        DxAccordionModule
    ],
  providers: [DatePipe],
  templateUrl: './work-order.component.html',
  styleUrl: './work-order.component.scss',
  animations: [
    trigger('expandCollapse', [
        state('collapsed', style({ height: '0px', overflow: 'hidden' })),
        state('expanded', style({ height: '*' })),
        transition('collapsed <=> expanded', [animate('300ms ease-in-out')])
    ])
]
})
export class WorkOrderComponent implements OnInit{

  icons = { cilCheck, cilPlus, cilArrowRight, cilChartPie, cilSpeedometer, cilArrowBottom, cilArrowTop, cilCarAlt, cilReload, cilOptions, cilClipboard, cilFilter};
  workOrderList: WorkOrderDTO[];
  filteredWorkOrderList: WorkOrderDTO[];
  newWorkOrder: WorkOrderDTO;
  modifyWorkOrder: WorkOrderDTO;
  newWorkOrderModalVisible = false;
  validPartnerList : PartnerDTO[];
  driverList : DriverDTO[];
  toastVisible = false;
  toastPosition = ToasterPlacement.BottomCenter;
  toastMessage = '';
  expandedWorkOrders: boolean[] = [];
  isLoading = false;
  plateChangeModalVisible = false;
  driverChangePopupVisible = false;
  driverModificationDto: DriverModificationDto;
  filterClosed = false;
  @ViewChild('newWorkOrderForm') newWorkOrderForm: DxFormComponent;
  @ViewChild('newWorkOrderPopup') newWorkOrderPopup: DxFormComponent;
  @ViewChild('scrollView') scrollView: DxScrollViewComponent;
  @ViewChild('workOrderListAccordion') workOrderListAccordion: DxAccordionComponent;

  plateSearchText = '';
    idCaption: 'id';
  triggerOpenNewOrderPopupSubscripton: Subscription;
  triggerSearchTextChangedSubscripton: Subscription;


  addRideButtonOption: DxButtonTypes.Properties = {
      icon: 'add',
      text: 'Fuvar hozzáadása',
      onClick: () => {
          this.newWorkOrder.rides?.push({
              finishLocationAddress: null,
              finishLocationCity: null,
              executeNr: this.newWorkOrder.rides?.length + 1,
              pickUpTime:null,
              relRideDrivers: [],
              startLocationAddress: null,
              startLocationCity: null,
              startLocationZip: null,
              finishLocationZip: null});
             this.scrollDown();
        },
    };

  constructor(private daoService: DaoService,
              private router: Router,
              private datePipe: DatePipe,
              private triggerService: TriggerService) {
      this.newWorkOrder = {partner: {}, rideCnt: null, rides: []};
      this.rideCntChanged = this.rideCntChanged.bind(this);
      this.scrollDown = this.scrollDown.bind(this);
      console.log('newWorkOrder', this.newWorkOrder)

  }

  ngOnInit(): void {

      this.loadWorkflowData();

      this.daoService.findAllValidPartner().subscribe(
          {
              next: (validPartners : any) => {
                  console.log('validPartners', validPartners)
                  this.validPartnerList = validPartners;
              },
              error: (error : any) => {
                  console.error('findAllValidPartner error: ', error)
              }
          }
      )
      this.daoService.findAllDriver().subscribe(
          {
              next: (allDriver : any) => {
                  this.driverList = allDriver;
              },
              error: (error : any) => {
                  console.error('findAllDriver error: ', error)
              }
          }
      )

      this.triggerOpenNewOrderPopupSubscripton = this.triggerService.triggerOpenNewOrderPopupFunctionObservable.subscribe(() => {

          this.newWorkOrderModalVisible = true;

      });

      this.triggerSearchTextChangedSubscripton = this.triggerService.triggerSearchTextChangedFunctionObservable.subscribe((newValue: string) => {
          console.log('emitted: ', newValue)
          this.filteredWorkOrderList = this.workOrderList.filter(workOrder => workOrder.plateNr?.toLowerCase().includes(newValue.toLowerCase()));


      });




  }

    loadWorkflowData() {
      this.isLoading = true;
        this.daoService.findAllWorkOrder().subscribe(
            {
                next: (workOrders: any) => {
                    console.log('workOrders', workOrders);
                    this.workOrderList = workOrders;
                    this.filteredWorkOrderList = this.workOrderList;
                    this.expandedWorkOrders = new Array(this.workOrderList.length).fill(false);
                    this.isLoading = false;
                },
                error: (error: any) => {
                    console.error('findAllWorkOrder error: ', error);
                    this.isLoading = false;
                }
            }
        )
    }

    scrollDown() {
      this.newWorkOrderPopup.instance.repaint();
      const position = this.scrollView.instance.scrollTop();
      if (position >= 0) {
          this.scrollView.instance.scrollTo(this.scrollView.instance.scrollHeight());
      }
  }
  openSurvey(orderId: number, rideId: number) {
    console.log('openSurvey orderId:',orderId, 'rideId:',rideId);
    this.router.navigate(['/home/survey'], { queryParams: { orderId: orderId, rideId: rideId } });
  }

    viewRide(rideId: number) {
        console.log('rideId:',rideId);
        this.router.navigate(['/home/view-ride'], { queryParams: { rideId: rideId } });
    }

  formatDate(dateString: string | null | undefined, type: string) {

      switch (type) {
          case 'long':
              return this.datePipe.transform(dateString, 'yyyy.MM.dd HH:mm');
          case 'short':
              return this.datePipe.transform(dateString, 'yyyy.MM.dd');
          default:
              return this.datePipe.transform(dateString, 'yyyy.MM.dd HH:mm');
      }

  }

    toggleNewWorkOrderModal() {
        //this.newWorkOrder = {partner: {}, carNr:null, rideCnt: null, rides: []};
        this.newWorkOrderModalVisible = !this.newWorkOrderModalVisible;
        //this.newWorkOrderForm.instance.clear();
    }

    toggleChangePlateModal(e: any, workOrder: WorkOrderDTO) {
        e.event.stopPropagation();
        console.log('toggleChangePlateModal', workOrder)
        const orderId = workOrder.orderId;
        const plateNr = workOrder.plateNr;
        this.modifyWorkOrder = {orderId, plateNr};
        console.log('modifyWorkOrder:', this.modifyWorkOrder)
        this.plateChangeModalVisible = !this.plateChangeModalVisible;
    }

    toggleChangeDriverModal(ride: RideDTO) {
        this.driverModificationDto = {rideId: ride.rideId!,
                                      driverId: ride.relRideDrivers[0].driver.driverId};

        console.log('driverModificationDto:', this.driverModificationDto)
        this.driverChangePopupVisible = !this.plateChangeModalVisible;
    }

    closeNewWorkOrderPopup() {
        this.newWorkOrderForm.instance.clear();
    }
    rideCntChanged(e : any) {

      const newRideValue = e.value;

      if (newRideValue > this.newWorkOrder.rides!.length) {

          const rideCntToCreate = newRideValue - this.newWorkOrder.rides!.length;

          for (let i = 1; i <= rideCntToCreate; i++) {

              this.newWorkOrder.rides?.push({
                  finishLocationAddress: null,
                  finishLocationCity: null,
                  executeNr: this.newWorkOrder.rides?.length + 1,
                  pickUpTime: null,
                  relRideDrivers: [],
                  startLocationAddress: null,
                  startLocationCity: null,
                  startLocationZip: null,
                  finishLocationZip: null});
          }
      }

        if (newRideValue < this.newWorkOrder.rides!.length) {
            const itemCntToRemove = this.newWorkOrder.rides!.length - newRideValue;
            for (let i = 1; i <= itemCntToRemove; i++) {
                this.newWorkOrder.rides!.pop();
            }

        }

  }
  saveNewWorkOrder(e: any) {

      e.preventDefault();
      console.log('saveNewWorkOrder invoked: ', this.newWorkOrder);
      this.isLoading = true;



      this.daoService.saveNewWorkOrder(this.newWorkOrder).subscribe(
          {
              next: (saveNewWorkOrderResponse: any) => {
                  console.log('saveNewWorkOrderResponse', saveNewWorkOrderResponse);
                  this.loadWorkflowData();
                  this.newWorkOrderForm.instance.clear();
                  this.newWorkOrderModalVisible = !this.newWorkOrderModalVisible;
                  this.showToast('Sikeres megrendelés létrehozás!');
                  this.isLoading = false;
              },
              error: (error: any) => {
                  console.error('saveNewWorkOrder error: ', error)
                  this.showToast('Hiba: ' + error);
                  this.isLoading = false;
              }
          }
      );

  }

    modifyPlateNr(e : any) {
        e.preventDefault();
        console.log('modifyWorkOrder invoked: ', this.modifyWorkOrder);
        this.isLoading = true;
        this.daoService.modifyWorkOrder(this.modifyWorkOrder).subscribe({
            next: (modifyWorkOrderResponse: any) => {

                this.plateChangeModalVisible = !this.plateChangeModalVisible;
                this.showToast('Sikeres rendszám módosítás!');
                this.loadWorkflowData();
                this.isLoading = false;
                this.plateChangeModalVisible = false;
            },
            error: (error: any) => {
                console.error('saveNewWorkOrder error: ', error)
                this.showToast('Hiba: ' + error);
                this.isLoading = false;
                this.plateChangeModalVisible = false;
            }
        });

    }

    modifyDriverForRide(e: any) {
      e.preventDefault();
      console.log('modifyDriver invoked: ', this.driverModificationDto);
      this.isLoading = true;
      this.daoService.modifyDriverForRide(this.driverModificationDto).subscribe({
          next: (modifyDriverForRideResult : any) => {
              this.showToast('Sikeres sofőr módosítás!');
              this.loadWorkflowData();
              this.isLoading = false;
              this.driverChangePopupVisible = false;
          },
          error: (error: any) => {
              console.error('modifyDriverForRide error: ', error)
              this.showToast('Hiba: ' + error.message);
              this.isLoading = false;
              this.driverChangePopupVisible = false;
          }
      })
    }

  showToast(message: string) {
      this.toastMessage = message;
      this.toastVisible = true;
  }

    toggleRides(index: number) {
        this.expandedWorkOrders = this.expandedWorkOrders.map((_, i) => i === index ? !this.expandedWorkOrders[i] : false);
    }

    isNotDoneRideOnWorkOrder(workOrder: WorkOrderDTO): boolean | undefined {

        return workOrder.rides?.some(ride => ride.boolId == 1)

    }

    disableRideSurvey(workOrder: WorkOrderDTO, currentRide: RideDTO): boolean {
        if (workOrder.rides?.length == 1) {
            return false;
        }
        return workOrder.rides!.some(
            (ride) =>
                ride.executeNr > currentRide.executeNr &&
                ride.boolId === 1 &&
                ride.rideId !== currentRide.rideId
        );
    }

    doneRideCounter(workOrder : WorkOrderDTO): number | undefined {
        return workOrder.rides?.filter(ride => ride.boolId == 2).length
    }

    rideSelected(e: any){
      console.log('rideSelected', e);
    }

    getBackgroundColor(workOrder: WorkOrderDTO): string {
        return workOrder.rides?.filter(ride => ride.boolId == 1).length! > 0 ? 'rgba(245,184,184,0.5)' : 'rgba(203,227,238,0.5)';
    }


    protected readonly JSON = JSON;
}
