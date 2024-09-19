import { Component } from '@angular/core';
import { SidebarNavComponent } from '../../../../shared/components/admin/sidebar-nav/sidebar-nav.component';
import { RouterOutlet } from '@angular/router';
import { AdminAuthService } from '../../services/admin.service';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { adminLogOut } from '../../store/admin.actions';


@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [SidebarNavComponent, RouterOutlet, CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})


export class AdminPanelComponent {
  isLoggedIn: boolean = false;

  constructor(
    private adminService: AdminAuthService,
    private store: Store
  ){}

  ngOnInit(): void {
    // this.store.select(isLogged).subscribe(data=> {
    //    this.isLoggedIn = data;
    // })
 }


 onLogout() {
    this.store.dispatch(adminLogOut())
 }

}
