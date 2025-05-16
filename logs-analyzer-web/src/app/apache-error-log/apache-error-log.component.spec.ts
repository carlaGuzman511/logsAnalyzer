import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApacheErrorLogComponent } from './apache-error-log.component';

describe('ApacheErrorLogComponent', () => {
  let component: ApacheErrorLogComponent;
  let fixture: ComponentFixture<ApacheErrorLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApacheErrorLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApacheErrorLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
