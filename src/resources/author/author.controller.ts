import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@app/common/guards';
import { AuthorService } from './author.service';
import { AuthorResponseDTO, CreateAuthorDTO } from './dto';
import { FindIdDTO } from '@app/common/dtos';

@ApiBearerAuth()
@ApiTags('Author')
@UseGuards(AuthGuard)
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new author' })
  @ApiResponse({ status: 201, type: AuthorResponseDTO })
  @Post()
  async create(
    @Body() createAuthorDTO: CreateAuthorDTO,
  ): Promise<AuthorResponseDTO> {
    if ((await this.authorService.findByName(createAuthorDTO.name)).length) {
      throw new HttpException('author already exists', HttpStatus.BAD_REQUEST);
    }

    const author = await this.authorService.create(createAuthorDTO);
    return author;
  }

  @ApiOperation({ summary: 'Return author by Id' })
  @ApiResponse({ status: 200, type: AuthorResponseDTO })
  @Get('/:id')
  async findById(@Param() params: FindIdDTO): Promise<AuthorResponseDTO> {
    const author = await this.authorService.findOne(+params.id);
    if (!author) {
      throw new HttpException('author not found', HttpStatus.NOT_FOUND);
    }
    return author;
  }

  @ApiOperation({ summary: 'Change author property' })
  @ApiResponse({ status: 200, type: AuthorResponseDTO })
  @Put('/:id')
  async update(
    @Param() params: FindIdDTO,
    @Body() body: CreateAuthorDTO,
  ): Promise<AuthorResponseDTO> {
    const author = await this.findById(params);
    const updatedAuthor = await this.authorService.update(author, body);
    return updatedAuthor;
  }

  @ApiOperation({ summary: 'Delete author by Id' })
  @ApiResponse({ status: 200, type: AuthorResponseDTO })
  @Delete('/:id')
  async remove(@Param() params: FindIdDTO): Promise<AuthorResponseDTO> {
    const author = await this.findById(params);
    const removedAuthor = await this.authorService.remove(author);
    return removedAuthor;
  }
}
