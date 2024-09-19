import { ApplicationConfig } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { VendorEffects } from './store/vendor.effects';
import { VendorWebRTCService } from './services/vendorWebrtc.service';
import { VendorAuthService } from './services/vendor-auth.service';




export const vendorConfig: ApplicationConfig = {
  providers: [
    provideEffects(VendorEffects),
    VendorWebRTCService,
    VendorAuthService

  ],
};
