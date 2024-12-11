import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreFrameComponent } from './genre-frame.component';

describe('GenreFrameComponent', () => {
  let component: GenreFrameComponent;
  let fixture: ComponentFixture<GenreFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
