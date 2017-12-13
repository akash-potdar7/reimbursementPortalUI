import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RParticularsFormComponent } from './r-particulars-form.component';

describe('RParticularsFormComponent', () => {
  let component: RParticularsFormComponent;
  let fixture: ComponentFixture<RParticularsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RParticularsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RParticularsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
