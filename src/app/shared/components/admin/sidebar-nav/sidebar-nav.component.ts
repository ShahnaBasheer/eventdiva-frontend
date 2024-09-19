import { Component } from '@angular/core';
import { RouterModule  } from '@angular/router';
import { DashboardComponent } from '../../../../features/admin/components/dashboard/dashboard.component';


@Component({
  selector: 'app-sidebar-nav',
  standalone: true,
  imports: [
    DashboardComponent,
    RouterModule
  ],
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.css'
})


export class SidebarNavComponent {


}
