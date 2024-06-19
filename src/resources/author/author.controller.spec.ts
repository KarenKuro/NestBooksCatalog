import { Repository } from 'typeorm';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { AuthorEntity } from '@app/common/entities';
import { IAuthor } from '@app/common/models';

describe('AuthorController', () => {
  let authorController: AuthorController;
  let authorService: AuthorService;
  let fakeauthorRepository: Repository<AuthorEntity>;

  beforeEach(() => {
    authorService = new AuthorService(fakeauthorRepository);
    authorController = new AuthorController(authorService);
  });

  it('should return author by id', async () => {
    const author = {
      id: 5,
      name: 'D',
      biography: 'Bla bla',
      books: [],
      dateOfBirth: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as IAuthor;

    authorService.findOne = jest.fn().mockImplementation(() => author);
    expect(await authorController.findById({ id: '5' })).toEqual(author);
  });
});
