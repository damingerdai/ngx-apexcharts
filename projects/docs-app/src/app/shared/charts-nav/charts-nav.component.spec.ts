import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsNavComponent } from './charts-nav.component';

describe('ChartsNavComponent', () => {
  let component: ChartsNavComponent;
  let fixture: ComponentFixture<ChartsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsNavComponent]
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
