import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExersiceFormComponent } from './exersice-form.component';

describe('ExersiceFormComponent', () => {
  let component: ExersiceFormComponent;
  let fixture: ComponentFixture<ExersiceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExersiceFormComponent]
    });
    fixture = TestBed.createComponent(ExersiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
