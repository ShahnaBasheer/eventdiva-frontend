import { ApplicationConfig } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { AdminEffects } from './store/admin.effects';
import { AdminBroadcastChannelService } from './services/broadcast-admin.service';
import { AdminAuthService } from './services/admin.service';
import { VenuesAdminService } from './services/venues.service';
import { EventPlannerAdminService } from './services/planner.service';




export const adminConfig: ApplicationConfig = {
  providers: [
    provideEffects(AdminEffects),
    AdminBroadcastChannelService,
    AdminAuthService,
    VenuesAdminService,
    EventPlannerAdminService

  ],
};
