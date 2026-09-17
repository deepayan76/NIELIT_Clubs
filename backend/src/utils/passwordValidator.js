/**
 * Centralized Password Policy & Validator for NIELIT Tech Clubs
 * Enforces production-ready password complexity without excessive friction.
 */

export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return {
      isValid: false,
      message: 'Password is required.'
    };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long.'
    };
  }

  if (password.length > 128) {
    return {
      isValid: false,
      message: 'Password cannot exceed 128 characters.'
    };
  }

  if (/\s/.test(password)) {
    return {
      isValid: false,
      message: 'Password cannot contain spaces.'
    };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumber) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.'
    };
  }

  return {
    isValid: true,
    message: null
  };
}

export default validatePassword;
