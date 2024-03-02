export const validateEmail = (email: string) => {
  const errors = [];
  if (!email) {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Email is not valid");
    }
  }
  return errors;
};
