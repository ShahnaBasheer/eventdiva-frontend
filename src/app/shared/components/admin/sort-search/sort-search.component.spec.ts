import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortSearchComponent } from './sort-search.component';

describe('SortSearchComponent', () => {
  let component: SortSearchComponent;
  let fixture: ComponentFixture<SortSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
