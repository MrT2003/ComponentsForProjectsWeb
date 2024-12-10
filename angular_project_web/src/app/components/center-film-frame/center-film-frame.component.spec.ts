import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterFilmFrameComponent } from './center-film-frame.component';

describe('CenterFilmFrameComponent', () => {
  let component: CenterFilmFrameComponent;
  let fixture: ComponentFixture<CenterFilmFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterFilmFrameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterFilmFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
