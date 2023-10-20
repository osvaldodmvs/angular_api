import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawDepositComponent } from './withdraw-deposit.component';

describe('WithdrawDepositComponent', () => {
  let component: WithdrawDepositComponent;
  let fixture: ComponentFixture<WithdrawDepositComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawDepositComponent]
    });
    fixture = TestBed.createComponent(WithdrawDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
