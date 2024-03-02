import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { SignUpDto } from '../dtos';
import { AppLogger } from 'src/common';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private logger: AppLogger,
  ) {}

  async getUserByEmail(userEmail: string): Promise<User> {
    const functionName = this.getUserByEmail.name;
    try {
      return await this.userModel.findOne({
        userEmail,
      });
    } catch (error) {
      this.logger.logError(functionName, error, { userEmail });
      throw new InternalServerErrorException({
        message: 'Failed to get user by user email from database',
      });
    }
  }

  async savetUser(signUpDto: SignUpDto): Promise<User> {
    const functionName = this.getUserByEmail.name;
    try {
      const createdUser = new this.userModel(signUpDto);
      return await createdUser.save();
    } catch (error) {
      this.logger.logError(functionName, error, { signUpDto });
      throw new InternalServerErrorException({
        message: 'Failed to save user to database',
      });
    }
  }
}
