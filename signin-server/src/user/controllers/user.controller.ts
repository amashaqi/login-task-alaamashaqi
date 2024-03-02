import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guards';
import { RolesGuard } from '../guards/role.guards';
import { Role } from '../enums/roles.enums';
import { Roles } from '../decorators/roles.decorator';
import { WelcomeResponseDto } from '../dtos/auth.dto';

@Controller('/v1/user')
export class UserController {
  constructor() {}

  @Get('welcome')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  public async getWelcomeMessage(): Promise<WelcomeResponseDto> {
    const welcomeMessage = { welcomeMessage: 'Welcome to the application.' };
    return await welcomeMessage;
  }
}
