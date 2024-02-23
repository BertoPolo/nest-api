import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    try {
      // save the new user in the database
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash, // why this is not password : hash ????
        },
        // select: {
        //   // inside here you choose what you want to return. cause for eg, you dont wnat to return the hash
        //   id: true,
        //   email: true,
        //   createdAt: true,
        //   updatedAt: true,
        // },
      });
      // instead of select:{}, you can write : delete user.hash  and is quicker
      delete user.hash;
      // return the saved user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // basicaly if its a Prisma error
        //we only need the prisma error for duplicated emails
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials are already in use');
      }
      //not a Prisma error
      throw error;
    }
  }

  signin() {}
}
