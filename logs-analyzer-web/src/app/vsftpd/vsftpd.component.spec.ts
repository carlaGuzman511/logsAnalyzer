import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VsftpdComponent } from './vsftpd.component';

describe('VsftpdComponent', () => {
  let component: VsftpdComponent;
  let fixture: ComponentFixture<VsftpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VsftpdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VsftpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
