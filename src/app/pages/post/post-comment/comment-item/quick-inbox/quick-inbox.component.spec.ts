import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickInboxComponent } from './quick-inbox.component';

describe('QuickInboxComponent', () => {
  let component: QuickInboxComponent;
  let fixture: ComponentFixture<QuickInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
