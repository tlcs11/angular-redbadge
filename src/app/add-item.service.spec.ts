import { TestBed } from '@angular/core/testing';

import { ItemService } from './add-item.service';

describe('ItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemService = TestBed.get(ItemService);
    expect(service).toBeTruthy();
  });
});



