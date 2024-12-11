import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfilmFrameComponent } from './newfilm-frame.component';

describe('NewfilmFrameComponent', () => {
  let component: NewfilmFrameComponent;
  let fixture: ComponentFixture<NewfilmFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewfilmFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewfilmFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
