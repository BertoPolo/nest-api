import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// this is to validate your incoming data ( req.body )
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
