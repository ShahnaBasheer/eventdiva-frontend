import { AuthGuard } from './core/guards/customer.auth.guard';
import { AdminAuthGuard } from './core/guards/admin.auth.guard';
import { VendorAuthGuard } from './core/guards/vendor.auth.guard';
import { Routes } from '@angular/router';
import { LoginComponent } from './features/customer/components/login/login.component';
import { CustomersComponent } from './features/customer/components/customer.component';
import { DashboardComponent } from './features/admin/components/dashboard/dashboard.component';
import { AdminLoginComponent } from './features/admin/components/admin-login/admin-login.component';
import { EventPlannerDashboardComponent } from './features/vendors/event-planners/components/dashboard/dashboard.component';
import { VenueBookingComponent } from './features/customer/components/venue-booking/venue-booking.component';
import { HomeComponent } from './features/customer/components/home/home.component';
import { SignupComponent } from './features/customer/components/signup/signup.component';
import { BookingsComponent } from './features/customer/components/bookings/bookings.component';
import { VenueDetailComponent } from './features/customer/components/venue-detail/venue-detail.component';
import { AdminComponent } from './features/admin/components/admin.component';
import { OtpVerificationComponent } from './features/customer/components/otp-verification/otp-verification.component';
import { ForgotPasswordComponent } from './features/customer/components/forgot-password/forgot-password.component';
import { AdminPanelComponent } from './features/admin/components/admin-panel/admin-panel.component';
import { CustomersListComponent } from './features/admin/components/customers-list/customers-list.component';
import { SignupVendorComponent } from './shared/components/vendors/signup-vendor/signup-vendor.component';
import { VendorsMainComponent } from './features/vendors/vendors-main.component';
import { LoginVendorComponent } from './shared/components/vendors/login-vendor/login-vendor.component';
import { OtpVerifyComponent } from './shared/components/vendors/otp-verify/otp-verify.component';
import { AllVendorsComponent } from './features/vendors/common/all-vendors/all-vendors.component';
import { AddEventCompanyComponent } from './features/vendors/event-planners/components/add-event-company/add-event-company.component';
import { VendorProfileComponent } from './features/vendors/common/vendor-profile/vendor-profile.component';
import { VendorServicesComponent } from './shared/components/vendors/vendor-services/vendor-services.component';
import { EventPlannerDetailComponent } from './features/vendors/event-planners/components/event-planner-detail/event-planner-detail.component';
import { VendorsListComponent } from './features/admin/components/vendors-list/vendors-list.component';
import { AllEventPlannersComponent } from './features/customer/components/event-planners/event-planners.component';
import { PlannerDetailComponent } from './features/customer/components/planner-detail/planner-detail.component';
import { VenueDashboardComponent } from './features/vendors/venue-vendor/components/venue-dashboard/venue-dashboard.component';
import { VenueRegistrationComponent } from './features/vendors/venue-vendor/components/venue-registration/venue-registration.component';
import { NotFoundComponent } from './shared/components/common/not-found/not-found.component';
import { VenueDetailComponent as VenueVendorComponent } from './features/vendors/venue-vendor/components/venue-detail/venue-detail.component';
import { VenuesComponent } from './features/customer/components/venues/venues.component';
import { VenuesListComponent } from './features/admin/components/venues-list/venues-list.component';
import { EventPlannersListComponent } from './features/admin/components/event-planners-list/event-planners-list.component';
import { VenuesBookingListComponent } from './features/admin/components/venues-booking-list/venues-booking-list.component';
import { VenueBookingsComponent } from './features/vendors/venue-vendor/components/venue-bookings/venue-bookings.component';
import { VenueBookingDetailsComponent } from './shared/components/vendors/booking-details/booking-details.component';
import { PlannerBookingComponent } from './features/customer/components/planner-booking/planner-booking.component';
import { PlannersBookingListComponent } from './features/admin/components/planners-booking-list/planners-booking-list.component';
import { PlannersBookingComponent } from './features/vendors/event-planners/components/planners-booking/planners-booking.component';
import { PlannerBookingDetailsComponent } from './features/vendors/event-planners/planner-booking-details/planner-booking-details.component';
import { ServiceDetailsComponent } from './features/admin/components/service-details/service-details.component';
import { FullcalendarComponent } from './features/vendors/common/fullcalendar/fullcalendar.component';
import { InboxChatComponent } from './features/vendors/common/inbox-chat/inbox-chat.component';
import { BookingDetailsComponent } from './shared/components/customer/booking-details/booking-details.component';
import { ContactComponent } from './shared/components/common/contact/contact.component';
import { AboutComponent } from './shared/components/common/about/about.component';
import { UserProfileComponent } from './features/customer/components/user-profile/user-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'otpverification', component: OtpVerificationComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'about', component: AboutComponent },
      { path: 'vendors/venues', component: VenuesComponent },
      { path: 'vendors/venues/:slug', component: VenueDetailComponent },
      { path: 'vendors/event-planners', component: AllEventPlannersComponent },
      {
        path: 'vendors/event-planners/:slug',
        component: PlannerDetailComponent,
      },
      { path: 'bookings', component: BookingsComponent },
      { path: 'venues/:slug/booking', component: VenueBookingComponent },
      {
        path: 'event-planners/:slug/booking',
        component: PlannerBookingComponent,
      },
      {
        path: 'bookings/event-planner/details/:bookingId',
        component: BookingDetailsComponent,
        data: { type: 'planner' },
      },
      {
        path: 'bookings/venue/details/:bookingId',
        component: BookingDetailsComponent,
        data: { type: 'venue' },
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: '',
        component: AdminPanelComponent,
        canActivateChild: [AdminAuthGuard],
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'customers', component: CustomersListComponent },
          { path: 'vendors', component: VendorsListComponent },
          { path: 'venues', component: VenuesListComponent },
          {
            path: 'venues/details/:slug',
            component: ServiceDetailsComponent,
            data: { type: 'venue' },
          },
          { path: 'event-planners', component: EventPlannersListComponent },
          {
            path: 'event-planners/details/:slug',
            component: ServiceDetailsComponent,
            data: { type: 'planner' },
          },
          { path: 'venues/bookings', component: VenuesBookingListComponent },
          {
            path: 'event-planners/bookings',
            component: PlannersBookingListComponent,
          },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
      },
      { path: 'login', component: AdminLoginComponent },
    ],
  },

  {
    path: 'vendor',
    component: VendorsMainComponent,
    canActivateChild: [VendorAuthGuard],
    children: [
      { path: 'signup', component: SignupVendorComponent },
      { path: 'login', component: LoginVendorComponent },
      { path: 'otpverification', component: OtpVerifyComponent },
      {
        path: 'event-planner',
        component: AllVendorsComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: EventPlannerDashboardComponent },
          { path: 'profile', component: VendorProfileComponent },
          { path: 'service', component: EventPlannerDetailComponent },
          { path: 'new-service/:vendor', component: VendorServicesComponent },
          { path: 'add-service', component: AddEventCompanyComponent },
          { path: 'bookings', component: PlannersBookingComponent },
          {
            path: 'bookings/details/:bookingId',
            component: PlannerBookingDetailsComponent,
          },
          { path: 'calendar', component: FullcalendarComponent },
          { path: 'chat-room', component: InboxChatComponent },
        ],
      },
      {
        path: 'venue-vendor',
        component: AllVendorsComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: VenueDashboardComponent },
          { path: 'profile', component: VendorProfileComponent },
          { path: 'service', component: VenueVendorComponent },
          { path: 'new-service/:vendor', component: VendorServicesComponent },
          { path: 'add-service', component: VenueRegistrationComponent },
          { path: 'bookings', component: VenueBookingsComponent },
          {
            path: 'bookings/details/:bookingId',
            component: VenueBookingDetailsComponent,
          },
          { path: 'calendar', component: FullcalendarComponent },
          { path: 'chat-room', component: InboxChatComponent },
        ],
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'not-found', component: NotFoundComponent },
      { path: '**', redirectTo: 'not-found' },
    ],
  },
];
