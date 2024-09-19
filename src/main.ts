import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { customerConfig } from './app/features/customer/customer.config';
import { mergeApplicationConfig } from '@angular/core';
import { adminConfig } from './app/features/admin/admin.config';
import { vendorConfig } from './app/features/vendors/vendor.config';

const mergedConfig = mergeApplicationConfig(appConfig, customerConfig, adminConfig, vendorConfig);

bootstrapApplication(AppComponent, mergedConfig).catch((err) => console.error(err));
