import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFbGroupComponent } from './account-fb-group.component';

describe('AccountFbGroupComponent', () => {
  let component: AccountFbGroupComponent;
  let fixture: ComponentFixture<AccountFbGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountFbGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFbGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
