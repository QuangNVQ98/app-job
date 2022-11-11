import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFbInfoComponent } from './account-fb-info.component';

describe('AccountFbInfoComponent', () => {
  let component: AccountFbInfoComponent;
  let fixture: ComponentFixture<AccountFbInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountFbInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFbInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
