/**
 * Test Data Management Module
 * Contains all constants and fixtures needed for registration testing
 */

export const testData = {
  // ============ TIMEOUTS ============
  FORM_SUBMISSION_TIMEOUT: 15000,
  VALIDATION_TIMEOUT: 5000,
  PAGE_LOAD_TIMEOUT: 10000,

  // ============ VALID CREDENTIALS ============
  validPasswords: [
    'SecurePass@2025',
    'ValidPwd#123$ABC',
    'Test!Pass98765',
    'Complex@Pwd$2024'
  ],

  // ============ INVALID EMAIL FORMATS ============
  invalidEmails: [
    'plaintext',                    // No @ symbol
    '@example.com',                 // Missing local part
    'user@domain',                  // Missing TLD
    'user@.com',                    // Missing domain
    'user name@example.com',        // Space in local part
    'user@domain..com'              // Double dot
  ],

  // ============ WEAK PASSWORDS ============
  weakPasswords: [
    'password',                     // Common password, no numbers/special chars
    'pass123',                      // Only lowercase and numbers
    'Pass',                         // Too short
    '12345678',                     // Only numbers
    'abcdefgh',                     // Only lowercase
    'PASSWORD'                      // Only uppercase
  ],

  // ============ PASSWORD MISMATCH SCENARIOS ============
  passwordMismatchScenarios: [
    {
      password: 'Correct@Pass123',
      confirmPassword: 'Different@Pass123'
    },
    {
      password: 'MyPassword@1',
      confirmPassword: 'MyPassword@2'
    },
    {
      password: 'Test@2025',
      confirmPassword: 'Test@2026'
    }
  ],

  // ============ EXISTING EMAILS (PRE-POPULATED) ============
  existingEmails: [
    'existing.user@example.com',
    'registered@eventhub.com'
  ],

  // ============ ERROR MESSAGE PATTERNS ============
  errorMessages: {
    invalidEmail: /invalid|email|format|valid/i,
    weakPassword: /weak|password|strength|require/i,
    passwordMismatch: /password.*mismatch|confirm.*password|match|same/i,
    duplicateEmail: /already|duplicate|exist|register/i,
    requiredField: /required|please|enter|field/i,
    emailRequired: /email.*required|required.*email/i,
    passwordRequired: /password.*required|required.*password/i,
    confirmPasswordRequired: /confirm.*required|required.*confirm/i
  },

  // ============ SUCCESS MESSAGE PATTERNS ============
  successPatterns: {
    accountCreated: /account.*created|registration.*success|welcome|congratulation/i,
    redirectToLogin: /login|dashboard|home/i
  },

  // ============ SPECIAL TEST SCENARIOS ============
  specialCharacters: {
    passwordSpecialChars: '!@#$%^&*()',
    validSpecialPasswordExamples: [
      'Pass!@#$%^789',
      'Test@2025#Valid',
      'Secure$Pass&2024'
    ]
  },

  // ============ EMAIL GENERATION ============
  /**
   * Generate unique email for testing to avoid duplicate errors
   */
  generateUniqueEmail(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `testuser.${timestamp}.${random}@eventhub-test.com`;
  },

  /**
   * Generate unique username
   */
  generateUniqueUsername(): string {
    const timestamp = Date.now();
    return `testuser_${timestamp}`;
  },

  // ============ VALIDATION HELPERS ============
  /**
   * Check if password meets strength requirements
   */
  isPasswordStrong(password: string): boolean {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumbers &&
      hasSpecialChar
    );
  },

  /**
   * Validate email format
   */
  isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Get password strength level
   */
  getPasswordStrengthLevel(password: string): 'weak' | 'medium' | 'strong' {
    const score = [
      password.length >= 8,
      password.length >= 12,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    ].filter(Boolean).length;

    if (score >= 5) return 'strong';
    if (score >= 3) return 'medium';
    return 'weak';
  }
};
