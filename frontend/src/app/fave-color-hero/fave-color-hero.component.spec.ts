import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaveColorHeroComponent } from './fave-color-hero.component';

describe('FaveColorHeroComponent', () => {
  let component: FaveColorHeroComponent;
  let fixture: ComponentFixture<FaveColorHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaveColorHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaveColorHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
