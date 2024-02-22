import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') //here you define the main endpoint name
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup') // /auth/signup
  signup() {
    // return 'I am signed up';
    return this.authService.signup();
  }

  @Post('signin') // /auth/signin
  signin() {
    // return 'I am signed in';
    return this.authService.signin();
  }
}
