import { MaintenanceModule } from './maintenance.module';

describe('MaintainModule', () => {
  let maintainModule: MaintenanceModule;

  beforeEach(() => {
    maintainModule = new MaintenanceModule();
  });

  it('should create an instance', () => {
    expect(maintainModule).toBeTruthy();
  });
});
