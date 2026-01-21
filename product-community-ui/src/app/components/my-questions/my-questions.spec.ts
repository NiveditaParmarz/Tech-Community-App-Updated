import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuestions } from './my-questions';

describe('MyQuestions', () => {
  let component: MyQuestions;
  let fixture: ComponentFixture<MyQuestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyQuestions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyQuestions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
