import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ChartsNavComponent } from './charts-nav.component';

describe('ChartsNavComponent', () => {
  let component: ChartsNavComponent;
  let fixture: ComponentFixture<ChartsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsNavComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
