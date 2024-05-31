import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorService {
  getHi(): string {
    return 'Hi from author';
  }
}
