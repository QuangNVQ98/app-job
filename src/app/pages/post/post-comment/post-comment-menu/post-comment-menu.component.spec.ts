import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentMenuComponent } from './post-comment-menu.component';

describe('PostCommentMenuComponent', () => {
  let component: PostCommentMenuComponent;
  let fixture: ComponentFixture<PostCommentMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCommentMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCommentMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
