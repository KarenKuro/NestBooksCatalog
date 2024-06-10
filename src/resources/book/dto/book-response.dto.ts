import { IAuthor, IBook } from '@app/common/models';
import { ApiProperty } from '@nestjs/swagger';

export class BookResponseDTO implements IBook {
  @ApiProperty({ example: '123', description: 'Book Id' })
  id: number;

  @ApiProperty({ example: 'The Cherry Orchard', description: 'Book title' })
  title: string;

  @ApiProperty({ example: '1111111', description: 'Book ISBN' })
  isbn: string;

  @ApiProperty({ example: '2000-01-01' })
  publishedDate: Date;

  @ApiProperty({ example: 'Chechov', description: 'Book author' })
  author: IAuthor;

  createdAt: Date;

  updatedAt: Date;
}
