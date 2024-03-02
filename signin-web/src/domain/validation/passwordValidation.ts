export const validatePassword = (
  password: string,
  confirmedPassword: string
) => {
  const errors = [];
  if (!password) {
    errors.push("Password is required");
  } else if (password !== confirmedPassword) {
    errors.push("Password does not match");
  } else {
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
    }
    if (!/[a-zA-Z]/.test(password)) {
      errors.push("Password must contain at least one letter");
    }
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }
  }
  return errors;
};
