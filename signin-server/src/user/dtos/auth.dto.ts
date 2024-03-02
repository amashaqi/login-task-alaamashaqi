import { IsString } from 'class-validator';
import { Expose, Transform, plainToClass } from 'class-transformer';
import { Role } from '../enums/roles.enums';

export class SignInDto {
  @Expose()
  @IsString()
  readonly userEmail: string;

  @Expose()
  @IsString()
  readonly userPassword: string;
}

export class SignUpDto {
  @Expose()
  @IsString()
  readonly userName: string;

  @Expose()
  @IsString()
  readonly userEmail: string;

  @Expose()
  @IsString()
  readonly userPassword: string;

  @Expose()
  @Transform(({ value }) => value ?? [Role.User])
  roles: Role[] = [Role.User];
}

export class SignUpResponseDto {
  @Expose()
  @IsString()
  userEmail: string;

  @Expose()
  @IsString()
  userName: string;

  @Expose()
  @IsString()
  signUpResponseMessage: string;

  @Expose()
  statusCode: number;
  static buildDto(payload: {
    userEmail: string;
    userName: string;
    signUpResponseMessage: string;
    statusCode: number;
  }): SignUpResponseDto {
    return plainToClass(SignUpResponseDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}

export class SignInResponseDto {
  @Expose()
  userEmail: string;

  @Expose()
  signInResponseMessage: string;

  @Expose()
  jwtToken: string;

  @Expose()
  statusCode: number;
  static buildDto(payload: SignInResponseDto): SignInResponseDto {
    return plainToClass(SignInResponseDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}

export class WelcomeResponseDto {
  @Expose()
  welcomeMessage: string;
  static buildDto(payload: SignInResponseDto): SignInResponseDto {
    return plainToClass(SignInResponseDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
