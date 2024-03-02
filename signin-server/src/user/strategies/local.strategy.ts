import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services';
import { SignInDto } from '../dtos';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userEmail',
      passwordField: 'userPassword',
    });
  }

  validate(signInDto: SignInDto) {
    const user = this.authService.signIn(signInDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
