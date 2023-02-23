import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from 'src/auth/models/token.model';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }

    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      acces_token: this.jwtService.sign(payload),
      user,
    };
  }
}
