import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {
  CardBodyComponent,
  CardComponent, CardSubtitleDirective, CardTextDirective, CardTitleDirective,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormFloatingDirective, FormLabelDirective, GutterDirective, NavComponent, NavItemComponent, NavLinkDirective,
  RowComponent, TabContentComponent, TabContentRefDirective, TabPaneComponent
} from "@coreui/angular";
import {IconDirective} from "@coreui/icons-angular";
import {SurveyModule} from "survey-angular-ui";
import {cilArrowLeft, cilArrowThickFromRight} from "@coreui/icons";
import {DaoService} from "../../shared/dao.service";
import {RideDTO} from "../work-order/dto/new-work-order-dto";
import {CommonModule, DatePipe, NgForOf} from "@angular/common";
import {Gallery, GalleryItem, GalleryModule, ImageItem} from "ng-gallery";
import {ViewRideService} from "./view-ride.service";
import {DxLoadIndicatorModule} from "devextreme-angular";

@Component({
  selector: 'app-view-ride',
  standalone: true,
  providers: [DatePipe],
  imports: [
    ColComponent,
    IconDirective,
    RowComponent,
    SurveyModule,
    RouterLink,
    NgForOf,
    CommonModule,
    ContainerComponent,
    FormControlDirective,
    FormFloatingDirective,
    FormLabelDirective,
    GutterDirective,
    CardComponent,
    CardBodyComponent,
    CardTitleDirective,
    CardSubtitleDirective,
    CardTextDirective,
    GalleryModule,
    DxLoadIndicatorModule,
    NavComponent,
    NavItemComponent,
    TabContentRefDirective,
    NavLinkDirective,
    TabContentComponent,
    TabPaneComponent
  ],
  templateUrl: './view-ride.component.html',
  styleUrl: './view-ride.component.scss'
})
export class ViewRideComponent implements OnInit{

  rideId: number | undefined = undefined;
  loadedRide: RideDTO | undefined = undefined;
  icons = { cilArrowLeft, cilArrowThickFromRight};
  galeryItems: GalleryItem[] = [];
  activeTab: number = 0;

  constructor(private route: ActivatedRoute,
              private daoService: DaoService,
              private datePipe: DatePipe,
              private gallery: Gallery,
              private viewRideService : ViewRideService) {
  }

  setActiveTab(tabIndex: number) {
    this.activeTab = tabIndex;
  }
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.rideId = +params['rideId'];   // use + to convert to number
      console.log('Survey rideId:', this.rideId);
    });

    if (this.rideId) {

      this.daoService.findRideById(this.rideId).subscribe({
        next: (findRideByIdResult : any) => {
          console.log('findRideByIdResult: ', findRideByIdResult);
          this.loadedRide = findRideByIdResult;

          for (let file of this.loadedRide!.files!) {

            this.viewRideService.downloadPicture(file.fileId).subscribe({

              next: (downloadFileResponse : any) => {
                const reader = new FileReader();
                reader.onload = () => {
                  const imageUrl = reader.result as string;
                  this.galeryItems.push(new ImageItem({ src: imageUrl, thumb: imageUrl }));
                  this.gallery.ref().load(this.galeryItems);
                };
                reader.readAsDataURL(downloadFileResponse);
              },
              error: (error : any) => {
                console.error('downloadFile error: ', error)
              }

            })
          }

        },
        error: (error : any) => {
          console.error('findRideById error: ', error)
        }
      })

    }
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

  protected readonly JSON = JSON;
}
