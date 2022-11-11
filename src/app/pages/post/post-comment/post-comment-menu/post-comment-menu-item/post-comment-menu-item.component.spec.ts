import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentMenuItemComponent } from './post-comment-menu-item.component';

describe('PostCommentMenuItemComponent', () => {
  let component: PostCommentMenuItemComponent;
  let fixture: ComponentFixture<PostCommentMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCommentMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCommentMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
