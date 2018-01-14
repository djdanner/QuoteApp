import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteStreamComponent } from './quote-stream.component';

describe('QuoteStreamComponent', () => {
  let component: QuoteStreamComponent;
  let fixture: ComponentFixture<QuoteStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
