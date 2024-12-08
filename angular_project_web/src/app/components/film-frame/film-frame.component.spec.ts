import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmFrameComponent } from './film-frame.component';

describe('FilmFrameComponent', () => {
  let component: FilmFrameComponent;
  let fixture: ComponentFixture<FilmFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
