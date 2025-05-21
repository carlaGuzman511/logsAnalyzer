import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VsftpdReportComponent } from './vsftpd-report.component';

describe('VsftpdReportComponent', () => {
  let component: VsftpdReportComponent;
  let fixture: ComponentFixture<VsftpdReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VsftpdReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VsftpdReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
