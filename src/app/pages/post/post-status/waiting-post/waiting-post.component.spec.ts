import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingPostComponent } from './waiting-post.component';

describe('WaitingPostComponent', () => {
  let component: WaitingPostComponent;
  let fixture: ComponentFixture<WaitingPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
