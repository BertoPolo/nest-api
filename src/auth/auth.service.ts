import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    // save the new user in the database
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash, // why this is not password : hash ????
      },
      select: {
        // inside here you choose what you want to return. cause for eg, you dont wnat to return the hash
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      // instead of select, you can write : delete user.hash  and is quicker
    });

    // return the saved user
    return user;
  }

  signin() {}
}
