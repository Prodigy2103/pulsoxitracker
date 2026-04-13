import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerStatusComponent } from './tracker-status.component';

describe('TrackerStatusComponent', () => {
  let component: TrackerStatusComponent;
  let fixture: ComponentFixture<TrackerStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackerStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
