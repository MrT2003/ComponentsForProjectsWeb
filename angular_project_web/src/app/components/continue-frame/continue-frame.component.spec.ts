import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueFrameComponent } from './continue-frame.component';

describe('ContinueFrameComponent', () => {
  let component: ContinueFrameComponent;
  let fixture: ComponentFixture<ContinueFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinueFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinueFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
