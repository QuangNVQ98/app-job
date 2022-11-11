import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFbPostComponent } from './account-fb-post.component';

describe('AccountFbPostComponent', () => {
  let component: AccountFbPostComponent;
  let fixture: ComponentFixture<AccountFbPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountFbPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFbPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
