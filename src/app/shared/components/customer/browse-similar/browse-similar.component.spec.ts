import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseSimilarComponent } from './browse-similar.component';

describe('BrowseSimilarComponent', () => {
  let component: BrowseSimilarComponent;
  let fixture: ComponentFixture<BrowseSimilarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseSimilarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseSimilarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
