import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    console.log(
      '🚀 ~ file: auth.service.ts:10 ~ AuthService ~ valitedateUser ~ user',
      user,
    );
    return user;

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return user;
    }

    return null;
  }
}
