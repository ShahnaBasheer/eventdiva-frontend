import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailServicesComponent } from './detail-services.component';

describe('DetailServicesComponent', () => {
  let component: DetailServicesComponent;
  let fixture: ComponentFixture<DetailServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
