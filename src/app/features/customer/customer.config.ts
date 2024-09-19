import { ApplicationConfig } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { CustomerEffects } from './store/customer.effects';
import { CustomerWebRTCService } from './services/customerWebrtc.service';
import { HomeService } from './services/home.service';
import { PlannerService } from './services/planner.service';




export const customerConfig: ApplicationConfig = {
  providers: [
    provideEffects(CustomerEffects),
    CustomerWebRTCService,
    HomeService,
    PlannerService

  ],
};
