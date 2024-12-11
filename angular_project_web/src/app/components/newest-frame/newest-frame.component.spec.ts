import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestFrameComponent } from './newest-frame.component';

describe('NewestFrameComponent', () => {
  let component: NewestFrameComponent;
  let fixture: ComponentFixture<NewestFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewestFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewestFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
