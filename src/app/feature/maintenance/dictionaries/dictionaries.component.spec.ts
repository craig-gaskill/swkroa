import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionariesComponent } from './dictionary.component';

describe('DictionaryComponent', () => {
  let component: DictionariesComponent;
  let fixture: ComponentFixture<DictionariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
