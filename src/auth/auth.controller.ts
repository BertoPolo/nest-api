import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth') //here you define the main route name
export class AuthController {
  constructor(private authService: AuthService) {}
  // here you define your endpoints

  @Post('signup') // /auth/signup
  signup(@Body() dto: AuthDto) {
    // dto is the equivalent of req.body
    // console.log({ dto });
    return this.authService.signup(dto);
  }

  @Post('signin') // /auth/signin
  signin(@Body() dto: AuthDto) {
    // return 'I am signed in';
    return this.authService.signin(dto);
  }
}
