import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWorksComponent } from './detail-works.component';

describe('DetailWorksComponent', () => {
  let component: DetailWorksComponent;
  let fixture: ComponentFixture<DetailWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailWorksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
