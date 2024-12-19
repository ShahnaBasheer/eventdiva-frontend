import { Component } from '@angular/core';
import { SidebarNavComponent } from '../../../../shared/components/admin/sidebar-nav/sidebar-nav.component';
import { RouterOutlet } from '@angular/router';
import { AdminAuthService } from '../../services/admin.service';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { adminLogOut } from '../../store/admin.actions';
import { getUser } from '../../store/admin.selectors';


@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [SidebarNavComponent, RouterOutlet, CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})


export class AdminPanelComponent {
  isLoggedIn: boolean = false;
  fullName: string = '';

  constructor(
    private adminService: AdminAuthService,
    private store: Store
  ){}

  ngOnInit(): void {
    this.store.select(getUser).subscribe(data => {
       this.fullName = `${data?.firstName} ${data?.lastName}`;
    })
 }


 onLogout() {
    this.store.dispatch(adminLogOut())
 }

}
