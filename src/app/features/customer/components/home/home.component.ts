import { Component, OnInit } from '@angular/core';
import { SearchLocationComponent } from '../../../../shared/components/customer/search-location/search-location.component';
import { HomeService  } from '../../services/home.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchLocationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{

  constructor(private homeService: HomeService){}

  ngOnInit(): void {
      this.loadHome();
  }

  loadHome(){
      this.homeService.getHomePage().subscribe({
        next: ()=>{
        }
      })
  }

}
