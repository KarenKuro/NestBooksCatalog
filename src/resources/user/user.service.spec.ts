import { Test } from '@nestjs/testing';
import { UserService } from './user.service';

it('can create an istance of user servise', async () => {
  const module = await Test.createTestingModule({
    providers: [UserService],
  }).compile();

  const service = module.get(UserService);

  expect(service).toBeDefined();
});
