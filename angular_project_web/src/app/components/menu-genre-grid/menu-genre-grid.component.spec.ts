import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGenreGridComponent } from './menu-genre-grid.component';

describe('MenuGenreGridComponent', () => {
  let component: MenuGenreGridComponent;
  let fixture: ComponentFixture<MenuGenreGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuGenreGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuGenreGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
