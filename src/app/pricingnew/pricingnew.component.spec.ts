import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingnewComponent } from './pricingnew.component';

describe('PricingnewComponent', () => {
  let component: PricingnewComponent;
  let fixture: ComponentFixture<PricingnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingnewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
