import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmGridComponent } from './film-grid.component';

describe('FilmGridComponent', () => {
  let component: FilmGridComponent;
  let fixture: ComponentFixture<FilmGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
