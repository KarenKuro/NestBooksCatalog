import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  getHi(): string {
    return 'Hi, Man :)))))';
  }
}
