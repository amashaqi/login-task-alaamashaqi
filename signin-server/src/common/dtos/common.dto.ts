import { Expose, plainToClass } from 'class-transformer';

export class ErrorResponseDto {
  @Expose()
  message: string;

  @Expose()
  statusCode: number;

  static buildDto(payload: {
    message: string;
    statusCode: number;
  }): ErrorResponseDto {
    return plainToClass(ErrorResponseDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
