import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitsOverviewComponent } from './habits-overview.component';

describe('HabitsOverviewComponent', () => {
  let component: HabitsOverviewComponent;
  let fixture: ComponentFixture<HabitsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
