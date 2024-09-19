import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieverVideoCallComponent } from './reciever-video-call.component';

describe('RecieverVideoCallComponent', () => {
  let component: RecieverVideoCallComponent;
  let fixture: ComponentFixture<RecieverVideoCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecieverVideoCallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecieverVideoCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
