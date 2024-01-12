import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeEditComponent } from './size-edit.component';

describe('SizeEditComponent', () => {
  let component: SizeEditComponent;
  let fixture: ComponentFixture<SizeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SizeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
