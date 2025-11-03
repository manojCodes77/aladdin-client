// Form validation utilities

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates email format
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Email is required');
    return { isValid: false, errors };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }
  
  // Check for common typos
  const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
  const domain = email.split('@')[1]?.toLowerCase();
  if (domain && !commonDomains.includes(domain) && domain.length < 4) {
    errors.push('Email domain looks suspicious. Please double-check.');
  }
  
  return { isValid: errors.length === 0, errors };
}

/**
 * Validates password strength with comprehensive checks
 */
export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Password is required');
    return { isValid: false, errors };
  }
  
  // Length check
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (password.length > 128) {
    errors.push('Password must not exceed 128 characters');
  }
  
  // Complexity checks
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  // Common password check
  const commonPasswords = [
    'password', 'password123', '12345678', 'qwerty', 'abc123',
    'password1', '123456789', '12345', '1234567890', 'admin'
  ];
  
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('This password is too common. Please choose a stronger password');
  }
  
  // Sequential characters check
  if (/(.)\1{2,}/.test(password)) {
    errors.push('Password should not contain repeated characters (e.g., "aaa", "111")');
  }
  
  return { isValid: errors.length === 0, errors };
}

/**
 * Calculates password strength score (0-4)
 */
export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
  
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'];
  
  const index = Math.min(score, 4);
  
  return {
    score: index,
    label: labels[index],
    color: colors[index]
  };
}

/**
 * Validates password confirmation
 */
export function validatePasswordMatch(
  password: string,
  confirmPassword: string
): ValidationResult {
  const errors: string[] = [];
  
  if (!confirmPassword) {
    errors.push('Please confirm your password');
    return { isValid: false, errors };
  }
  
  if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }
  
  return { isValid: errors.length === 0, errors };
}

/**
 * Validates business name
 */
export function validateBusinessName(name: string): ValidationResult {
  const errors: string[] = [];
  
  if (!name || name.trim().length === 0) {
    errors.push('Business name is required');
    return { isValid: false, errors };
  }
  
  if (name.trim().length < 2) {
    errors.push('Business name must be at least 2 characters');
  }
  
  if (name.trim().length > 100) {
    errors.push('Business name must not exceed 100 characters');
  }
  
  return { isValid: errors.length === 0, errors };
}

/**
 * Validates phone number (basic international format)
 */
export function validatePhone(phone: string): ValidationResult {
  const errors: string[] = [];
  
  if (!phone) {
    errors.push('Phone number is required');
    return { isValid: false, errors };
  }
  
  // Remove spaces, dashes, and parentheses
  const cleaned = phone.replace(/[\s\-()]/g, '');
  
  // Check if it's a valid format (10-15 digits, optional + prefix)
  const phoneRegex = /^\+?[1-9]\d{9,14}$/;
  
  if (!phoneRegex.test(cleaned)) {
    errors.push('Please enter a valid phone number');
  }
  
  return { isValid: errors.length === 0, errors };
}
