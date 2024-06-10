import { IAuthor, IBook } from '@app/common/models';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorResponseDTO implements IAuthor {
  @ApiProperty({ example: '123', description: 'Author Id' })
  id: number;

  @ApiProperty({
    example: 'Chechov',
    description: 'Author name',
  })
  name: string;

  @ApiProperty({ description: 'Author biography' })
  biography: string;

  @ApiProperty({ example: '2000-01-01' })
  dateOfBirth: Date;

  books: IBook[];

  createdAt: Date;

  updatedAt: Date;
}
