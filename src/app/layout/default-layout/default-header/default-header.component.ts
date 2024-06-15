import {Component, computed, DestroyRef, inject, Input, ViewChild} from '@angular/core';
import {
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent, ButtonDirective, ColComponent,
  ColorModeService,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective, FormControlDirective, FormDirective, GutterDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective, InputGroupComponent, InputGroupTextDirective,
  NavItemComponent,
  NavLinkDirective,
  ProgressBarDirective,
  ProgressComponent, RowComponent,
  SidebarToggleDirective,
  TextColorDirective,
  ThemeDirective, ToasterPlacement
} from '@coreui/angular';
import {NgForOf, NgIf, NgStyle, NgTemplateOutlet} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, filter, map, tap } from 'rxjs/operators';
import {AuthService} from "../../../auth/auth.service";
import {FormsModule} from "@angular/forms";
import {
  cilArrowBottom,
  cilArrowRight,
  cilArrowTop, cilCarAlt,
  cilChartPie,
  cilCheck, cilClipboard, cilFilter, cilOptions,
  cilPlus, cilReload,
  cilSpeedometer
} from "@coreui/icons";
import {DxFormComponent, DxFormModule, DxPopupModule} from "devextreme-angular";
import {DxiItemModule, DxiTabModule, DxiValidationRuleModule, DxoLabelModule} from "devextreme-angular/ui/nested";
import {DriverDTO, PartnerDTO, WorkOrderDTO} from "../../../views/work-order/dto/new-work-order-dto";
import {DaoService} from "../../../shared/dao.service";
import {DxButtonTypes} from "devextreme-angular/ui/button";
import {TriggerService} from "../../../shared/trigger.service";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  standalone: true,
  imports: [ContainerComponent, HeaderTogglerDirective, SidebarToggleDirective, IconDirective, HeaderNavComponent, NavItemComponent, NavLinkDirective, RouterLink, RouterLinkActive, NgTemplateOutlet, BreadcrumbRouterComponent, ThemeDirective, DropdownComponent, DropdownToggleDirective, TextColorDirective, AvatarComponent, DropdownMenuDirective, DropdownHeaderDirective, DropdownItemDirective, BadgeComponent, DropdownDividerDirective, ProgressBarDirective, ProgressComponent, NgStyle, FormDirective, FormControlDirective, ButtonDirective, FormsModule, RowComponent, GutterDirective, ColComponent, InputGroupTextDirective, InputGroupComponent, NgIf, DxFormModule, DxPopupModule, DxiItemModule, DxiTabModule, DxiValidationRuleModule, DxoLabelModule, NgForOf]
})
export class DefaultHeaderComponent  extends HeaderComponent  {

  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  isAdmin = false;
  plateSearchText = '';
  showHeader = false;
  newWorkOrderModalVisible = false;
  newWorkOrder: WorkOrderDTO;
  @ViewChild('newWorkOrderForm') newWorkOrderForm: DxFormComponent;
  isLoading = false;
  toastVisible = false;
  toastPosition = ToasterPlacement.TopCenter;
  toastMessage = '';
  validPartnerList : PartnerDTO[];
  driverList : DriverDTO[];
  iconsAll = { cilCheck, cilPlus, cilArrowRight, cilChartPie, cilSpeedometer, cilArrowBottom, cilArrowTop, cilCarAlt, cilReload, cilOptions, cilClipboard, cilFilter};

  readonly colorModes = [
    { name: 'light', text: 'Light', icon: 'cilSun' },
    { name: 'dark', text: 'Dark', icon: 'cilMoon' },
    { name: 'auto', text: 'Auto', icon: 'cilContrast' }
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode=> mode.name === currentMode)?.icon ?? 'cilSun';
  });

  constructor(authService: AuthService,
              router: Router,
              private daoService: DaoService,
              private triggerService: TriggerService) {
    super();
    this.#colorModeService.localStorageItemName.set('drive-and-fleet-theme-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');

    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter(theme => ['dark', 'light', 'auto'].includes(theme)),
        tap(theme => {
          this.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();

    this.isAdmin = authService.isUserAdmin();

    router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          console.log('header url', router.url)
          this.showHeader = router.url === '/home/work-order';
        });


  }

  toggleNewWorkOrderModal() {
        this.triggerService.triggerOpenNewOrderPopup()
  }

  onPlateSearchTextChange(newValue: string) {
    this.triggerService.triggerSearchTextChanged(newValue);

  }


  @Input() sidebarId: string = 'sidebar1';

  public newMessages = [
    {
      id: 0,
      from: 'Jessica Williams',
      avatar: '7.jpg',
      status: 'success',
      title: 'Urgent: System Maintenance Tonight',
      time: 'Just now',
      link: 'apps/email/inbox/message',
      message: 'Attention team, we\'ll be conducting critical system maintenance tonight from 10 PM to 2 AM. Plan accordingly...'
    },
    {
      id: 1,
      from: 'Richard Johnson',
      avatar: '6.jpg',
      status: 'warning',
      title: 'Project Update: Milestone Achieved',
      time: '5 minutes ago',
      link: 'apps/email/inbox/message',
      message: 'Kudos on hitting sales targets last quarter! Let\'s keep the momentum. New goals, new victories ahead...'
    },
    {
      id: 2,
      from: 'Angela Rodriguez',
      avatar: '5.jpg',
      status: 'danger',
      title: 'Social Media Campaign Launch',
      time: '1:52 PM',
      link: 'apps/email/inbox/message',
      message: 'Exciting news! Our new social media campaign goes live tomorrow. Brace yourselves for engagement...'
    },
    {
      id: 3,
      from: 'Jane Lewis',
      avatar: '4.jpg',
      status: 'info',
      title: 'Inventory Checkpoint',
      time: '4:03 AM',
      link: 'apps/email/inbox/message',
      message: 'Team, it\'s time for our monthly inventory check. Accurate counts ensure smooth operations. Let\'s nail it...'
    },
    {
      id: 3,
      from: 'Ryan Miller',
      avatar: '4.jpg',
      status: 'info',
      title: 'Customer Feedback Results',
      time: '3 days ago',
      link: 'apps/email/inbox/message',
      message: 'Our latest customer feedback is in. Let\'s analyze and discuss improvements for an even better service...'
    }
  ];

  public newNotifications = [
    { id: 0, title: 'New user registered', icon: 'cilUserFollow', color: 'success' },
    { id: 1, title: 'User deleted', icon: 'cilUserUnfollow', color: 'danger' },
    { id: 2, title: 'Sales report is ready', icon: 'cilChartPie', color: 'info' },
    { id: 3, title: 'New client', icon: 'cilBasket', color: 'primary' },
    { id: 4, title: 'Server overloaded', icon: 'cilSpeedometer', color: 'warning' }
  ];

  public newStatus = [
    { id: 0, title: 'CPU Usage', value: 25, color: 'info', details: '348 Processes. 1/4 Cores.' },
    { id: 1, title: 'Memory Usage', value: 70, color: 'warning', details: '11444GB/16384MB' },
    { id: 2, title: 'SSD 1 Usage', value: 90, color: 'danger', details: '243GB/256GB' }
  ];

  public newTasks = [
    { id: 0, title: 'Upgrade NPM', value: 0, color: 'info' },
    { id: 1, title: 'ReactJS Version', value: 25, color: 'danger' },
    { id: 2, title: 'VueJS Version', value: 50, color: 'warning' },
    { id: 3, title: 'Add new layouts', value: 75, color: 'info' },
    { id: 4, title: 'Angular Version', value: 100, color: 'success' }
  ];

}
