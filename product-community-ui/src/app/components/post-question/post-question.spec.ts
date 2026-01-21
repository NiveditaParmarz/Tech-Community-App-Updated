import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostQuestion } from './post-question';

describe('PostQuestion', () => {
  let component: PostQuestion;
  let fixture: ComponentFixture<PostQuestion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostQuestion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostQuestion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
