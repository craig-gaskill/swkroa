import {MembershipsModule} from './memberships.module';

describe('MembershipsModule', () => {
  let membershipModule: MembershipsModule;

  beforeEach(() => {
    membershipModule = new MembershipsModule();
  });

  it('should create an instance', () => {
    expect(membershipModule).toBeTruthy();
  });
});
