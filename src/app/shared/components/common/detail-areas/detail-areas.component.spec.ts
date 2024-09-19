import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAreasComponent } from './detail-areas.component';

describe('DetailAreasComponent', () => {
  let component: DetailAreasComponent;
  let fixture: ComponentFixture<DetailAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAreasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
