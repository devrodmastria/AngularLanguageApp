import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteWordsComponent } from './favorite-words.component';

describe('FavoriteWordsComponent', () => {
  let component: FavoriteWordsComponent;
  let fixture: ComponentFixture<FavoriteWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteWordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
