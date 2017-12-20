import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RformRecordsComponent } from './rform-records.component';

describe('RformRecordsComponent', () => {
  let component: RformRecordsComponent;
  let fixture: ComponentFixture<RformRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RformRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RformRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
