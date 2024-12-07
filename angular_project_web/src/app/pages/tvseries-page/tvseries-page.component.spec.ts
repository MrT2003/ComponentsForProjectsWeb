import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvseriesPageComponent } from './tvseries-page.component';

describe('TvseriesPageComponent', () => {
  let component: TvseriesPageComponent;
  let fixture: ComponentFixture<TvseriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvseriesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvseriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
