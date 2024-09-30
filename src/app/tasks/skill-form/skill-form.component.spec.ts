import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillFormComponent } from './skill-form.component';

describe('SkillFormComponent', () => {
  let component: SkillFormComponent;
  let fixture: ComponentFixture<SkillFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkillFormComponent]
    });
    fixture = TestBed.createComponent(SkillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
