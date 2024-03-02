import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  validatePassword(password: string): string[] {
    const errors = [];
    if (!password) {
      errors.push('Password is required');
    } else {
      if (password.length < 8) {
        errors.push('Password must be at least 8 characters');
      }
      if (!/[a-zA-Z]/.test(password)) {
        errors.push('Password must contain at least one letter');
      }
      if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
      }
      if (!/[!@#$%^&*]/.test(password)) {
        errors.push('Password must contain at least one special character');
      }
    }
    return errors;
  }

  validateEmail(email: string): string[] {
    const errors = [];
    if (!email) {
      errors.push('Email is required');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push('Email is not valid');
      }
    }
    return errors;
  }
}
