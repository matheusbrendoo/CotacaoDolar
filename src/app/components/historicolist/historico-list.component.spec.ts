import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricolistComponent } from './historico-list.component';

describe('HistoricolistComponent', () => {
  let component: HistoricolistComponent;
  let fixture: ComponentFixture<HistoricolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricolistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
