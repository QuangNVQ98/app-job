import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostInboxComponent } from './post-inbox.component';

describe('PostInboxComponent', () => {
  let component: PostInboxComponent;
  let fixture: ComponentFixture<PostInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
