import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeArtisteComponent } from './liste-artiste.component';

describe('ListeArtisteComponent', () => {
  let component: ListeArtisteComponent;
  let fixture: ComponentFixture<ListeArtisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeArtisteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeArtisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
