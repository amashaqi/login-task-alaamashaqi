import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService, UserService, ValidationService } from '../services';
import { AuthController, UserController } from '../controllers';
import { User, UserSchema } from '../schemas/user.schema';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt,strategy';
import { LoggerModule } from 'src/common';
@Module({
  imports: [
    LoggerModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [
    AuthService,
    UserService,
    ValidationService,
    LocalStrategy,
    ConfigService,
    JwtStrategy,
  ],
  controllers: [AuthController, UserController],
})
export class UserModule {}
