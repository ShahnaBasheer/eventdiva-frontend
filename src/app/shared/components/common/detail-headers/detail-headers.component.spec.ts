import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHeadersComponent } from './detail-headers.component';

describe('DetailHeadersComponent', () => {
  let component: DetailHeadersComponent;
  let fixture: ComponentFixture<DetailHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailHeadersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
