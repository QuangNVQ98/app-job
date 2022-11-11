import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFbListComponent } from './account-fb-list.component';

describe('AccountFbListComponent', () => {
  let component: AccountFbListComponent;
  let fixture: ComponentFixture<AccountFbListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountFbListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFbListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
