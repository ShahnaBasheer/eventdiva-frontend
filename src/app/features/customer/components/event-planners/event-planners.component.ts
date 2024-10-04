import { Component, OnInit } from '@angular/core';
import { VendorCardWrapComponent } from '../../../../shared/components/customer/vendor-card-wrap/vendor-card-wrap.component';
import { CardComponent } from '../../../../shared/components/customer/card/card.component';
import { AllVendorsService } from '../../services/vendors.service';
import IEventPlanner from '../../../../core/models/eventPlanner.model';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../../shared/components/common/loader/loader.component';
import { PlannerService } from '../../services/planner.service';
import { PlannerFiltersComponent } from '../../../../shared/components/customer/planner-filters/planner-filters.component';

@Component({
  selector: 'app-event-planners',
  standalone: true,
  imports: [
    VendorCardWrapComponent,
    CardComponent,
    CommonModule,
    LoaderComponent,
    PlannerFiltersComponent
  ],
  templateUrl: './event-planners.component.html',
  styleUrl: './event-planners.component.css',
})
export class AllEventPlannersComponent implements OnInit {
  isLoading = true;
  page: number = 1;
  searchItem: string = '';
  totalCount: number = 0;
  totalPages: number = 10;
  limit: number = 10;
  eventPlanners!: IEventPlanner[];
  selectedFilters!: {
    services: string[];
    location: string;
  };
  filterData!: {
    services: string[];
    amenities: string[];
    locations: string[];
    venueType: string[];
  };

  combinedFilters: { name: string, category: string }[] = [];

  constructor(
    private allvendorsservice: AllVendorsService,
    private plannerService: PlannerService
  ) {}

  ngOnInit(): void {
    this.plannerService.plannerfilters$.subscribe((value) => {
      this.selectedFilters = value;
      this.loadVenues();
      this.updateCombinedFilters();
    });
  }

  loadVenues() {
    this.allvendorsservice
      .getAllEventPlannersPage(this.page, this.limit, this.selectedFilters, this.searchItem)
      .subscribe({
        next: (res) => {
          this.totalCount = res.data?.totalCount;
          this.totalPages = res.data?.totalPages;
          this.eventPlanners = res.data?.eventPlanners;
          this.filterData = res.data?.filterData;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err, 'error occured');
          this.isLoading = false;
        },
      });
  }

  onSelectedPagination(data: number) {
    this.page = data;
    this.loadVenues();
  }

  onSelectPageLimit(data: number) {
    this.limit = data;
    this.loadVenues();
  }


  updateCombinedFilters() {
    this.combinedFilters = [
      ...this.selectedFilters?.services?.map(item => ({ name: item, category: 'service' })),
      { name: this.selectedFilters.location, category: 'location' }
    ];
  }


  removeFilter(item: { name: string, category: string }) {
    switch (item.category) {
      case 'service':
        this.selectedFilters.services = this.selectedFilters.services.filter(service => service !== item.name);
        break;
      case 'location':
        this.selectedFilters.location = ''; // Clear the selected location
        break;
    }

    // Update the combinedFilters after removal
    this.updateCombinedFilters();
       this.plannerService.updateFilters(this.selectedFilters);
    }

    onSearch(data: string){
      this.searchItem = data;
      this.loadVenues()
    }

}
