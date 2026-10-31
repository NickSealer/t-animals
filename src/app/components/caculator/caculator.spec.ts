import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Caculator } from './caculator';

describe('Caculator', () => {
  let component: Caculator;
  let fixture: ComponentFixture<Caculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Caculator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Caculator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
