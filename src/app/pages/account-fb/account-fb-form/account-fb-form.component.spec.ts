import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFbFormComponent } from './account-fb-form.component';

describe('AccountFbFormComponent', () => {
  let component: AccountFbFormComponent;
  let fixture: ComponentFixture<AccountFbFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountFbFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFbFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
