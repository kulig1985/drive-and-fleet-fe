import { TestBed } from '@angular/core/testing';

import { WorkflowListService } from './workflow-list.service';

describe('WorkflowListService', () => {
  let service: WorkflowListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
