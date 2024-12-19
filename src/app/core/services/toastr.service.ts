

import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})

export class ToastrAlertService {
  constructor(private toastr: ToastrService) {}

  success(message: string, title?: string) {
    this.clear();
    this.toastr.success(message, title);
  }

  error(message: string, title?: string) {
    this.clear();
    this.toastr.error(message, title);
  }

  info(message: string, title?: string) {
    this.clear();
    this.toastr.info(message, title);
  }

  warning(message: string, title?: string) {
    this.clear();
    this.toastr.warning(message, title);
  }

  clear() {
    this.toastr.clear(); // Clear all active toastr notifications
  }

  wrong(){
    this.clear();
    this.toastr.error("Something went wrong! Please try again later")
  }
}
