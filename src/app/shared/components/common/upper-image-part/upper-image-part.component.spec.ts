import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperImagePartComponent } from './upper-image-part.component';

describe('UpperImagePartComponent', () => {
  let component: UpperImagePartComponent;
  let fixture: ComponentFixture<UpperImagePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpperImagePartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpperImagePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
