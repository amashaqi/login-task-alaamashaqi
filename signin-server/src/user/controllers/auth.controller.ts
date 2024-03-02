import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../services';
import {
  SignInDto,
  SignInResponseDto,
  SignUpDto,
  SignUpResponseDto,
} from '../dtos/auth.dto';
import { ErrorResponseDto } from 'src/common/dtos/common.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { LocalGuard } from '../guards/local.guards';

@Controller('/v1/auth')
export class AuthController {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  public async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<SignUpResponseDto | ErrorResponseDto> {
    return await this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @UseGuards(LocalGuard)
  public async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<SignInResponseDto | ErrorResponseDto> {
    return await this.authService.signIn(signInDto);
  }
}
