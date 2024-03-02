import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  SignInDto,
  SignInResponseDto,
  SignUpDto,
  SignUpResponseDto,
} from '../dtos';
import { ErrorResponseDto } from 'src/common/dtos/common.dto';
import {
  INVALID_CREDENTIAL_ERROR_MESSAGE,
  SIGNIN_SUCCESS_MESSAGE,
  USER_ALREADY_EXISTS_ERROR_MESSAGE,
} from '../../common/common.constants';
import { ValidationService } from './validation.service';
import { UserService } from './user.service';
import { AppLogger } from 'src/common';

@Injectable()
export class AuthService {
  constructor(
    private logger: AppLogger,
    private jwtService: JwtService,
    private validationService: ValidationService,
    private userService: UserService,
  ) {}
  public async signUp(
    signUpDto: SignUpDto,
  ): Promise<SignUpResponseDto | ErrorResponseDto> {
    const functionName = this.signUp.name;
    try {
      const existingUser = await this.userService.getUserByEmail(
        signUpDto.userEmail,
      );
      if (existingUser) {
        return ErrorResponseDto.buildDto({
          message: USER_ALREADY_EXISTS_ERROR_MESSAGE,
          statusCode: HttpStatus.CONFLICT,
        });
      }
      if (
        this.validationService.validatePassword(signUpDto.userPassword)
          .length !== 0
      ) {
        return ErrorResponseDto.buildDto({
          message: this.validationService
            .validatePassword(signUpDto.userPassword)
            .join(', '),
          statusCode: HttpStatus.CONFLICT,
        });
      }
      if (
        this.validationService.validateEmail(signUpDto.userEmail).length !== 0
      ) {
        return ErrorResponseDto.buildDto({
          message: this.validationService
            .validateEmail(signUpDto.userEmail)
            .join('\n'),
          statusCode: HttpStatus.CONFLICT,
        });
      }
      const hashedPassword = await bcrypt.hash(signUpDto.userPassword, 12);
      const savedUser = await this.userService.savetUser({
        ...signUpDto,
        userPassword: hashedPassword,
      });
      const responseDto = SignUpResponseDto.buildDto({
        userEmail: savedUser.userEmail,
        userName: savedUser.userName,
        signUpResponseMessage: 'Your account has been successfully created.',
        statusCode: 201,
      });
      return responseDto;
    } catch (error) {
      this.logger.logError(functionName, error, { signUpDto });
      throw new InternalServerErrorException({
        message: 'Failed to sign up or create user',
      });
    }
  }

  public async signIn(
    signinDto: SignInDto,
  ): Promise<SignInResponseDto | ErrorResponseDto> {
    const functionName = this.signIn.name;
    try {
      const user = await this.userService.getUserByEmail(signinDto.userEmail);
      if (
        !user ||
        !(await bcrypt.compare(signinDto.userPassword, user.userPassword))
      ) {
        return ErrorResponseDto.buildDto({
          message: INVALID_CREDENTIAL_ERROR_MESSAGE,
          statusCode: HttpStatus.CONFLICT,
        });
      } else {
        return SignInResponseDto.buildDto({
          userEmail: user.userEmail,
          signInResponseMessage: SIGNIN_SUCCESS_MESSAGE,
          jwtToken: this.jwtService.sign({
            userEmail: user.userEmail,
            roles: user.roles,
          }),
          statusCode: 200,
        });
      }
    } catch (error) {
      this.logger.logError(functionName, error, { signinDto });
      throw new InternalServerErrorException({
        message: 'Failed to sign in',
      });
    }
  }
}

export default AuthService;
