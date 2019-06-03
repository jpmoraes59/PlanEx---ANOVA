import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaAnovaComponent } from './tabela-anova.component';

describe('TabelaAnovaComponent', () => {
  let component: TabelaAnovaComponent;
  let fixture: ComponentFixture<TabelaAnovaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaAnovaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaAnovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
