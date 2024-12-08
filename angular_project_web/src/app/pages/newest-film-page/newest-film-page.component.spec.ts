import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestFilmPageComponent } from './newest-film-page.component';
import { LeftMenuComponent } from '../../components/left-menu/left-menu.component';
describe('NewestFilmPageComponent', () => {
  let component: NewestFilmPageComponent;
  let fixture: ComponentFixture<NewestFilmPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewestFilmPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewestFilmPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
