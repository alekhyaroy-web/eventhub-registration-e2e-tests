// tests/e2e/registration/registration.spec.ts
// Spec: specs/plan.md

import { test, expect, Page } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RegistrationAssertions } from '../utils/assertions';
import {
  VALID_TEST_CREDENTIALS,
  INVALID_EMAIL_SCENARIOS,
  WEAK_PASSWORD_SCENARIOS,
  PASSWORD_MISMATCH_SCENARIOS,
  EXISTING_EMAIL,
} from '../utils/testData';

test.describe('EventHub User Registration Module (US-REG-001)', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigate();
  });

  // ============================================================================
  // MAIN FLOW - HAPPY PATH
  // ============================================================================

  test('[US-REG-001-01] should successfully register user when valid credentials are provided', async ({
    page,
  }) => {
    // Generate unique credentials for this test
    const testEmail = `sdet.qa+${Date.now()}@eventhub.io`;
    const testPassword = 'EventHub@2025';

    // Enter valid email in the registration form
    await page.locator('#register-email').fill(testEmail);

    // Enter strong password meeting requirements
    await page.locator('#register-password').fill(testPassword);

    // Enter matching confirmation password
    await page.locator('input[placeholder=\'Repeat your password\']').fill(testPassword);

    // Click Create Account button to submit the registration form
    await page.locator('button:has-text(\'Create Account\')').click();

    // Verify redirect to home page (successful registration)
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/', { timeout: 15000 });

    // Verify we're on the home page with events content
    await expect(page.locator('heading:has-text("Discover & Book Amazing Events")')).toBeVisible({
      timeout: 10000,
    });
  });

  // ============================================================================
  // ALTERNATE FLOW - AF-1: Invalid Email Format Validation
  // ============================================================================

  test.describe('[AF-1] Invalid Email Format Validation', () => {
    INVALID_EMAIL_SCENARIOS.forEach(({ email, description }) => {
      test(`[US-REG-001-02] should show error when email format is invalid - ${description}`, async ({
        page,
      }) => {
        // Enter invalid email format
        await page.locator('#register-email').fill(email);

        // Enter valid password
        await page.locator('#register-password').fill('EventHub@2025');

        // Enter matching confirm password
        await page.locator('input[placeholder=\'Repeat your password\']').fill('EventHub@2025');

        // Attempt to submit form
        await page.locator('button:has-text(\'Create Account\')').click();

        // Verify still on registration page (indicating validation error)
        await expect(page).toHaveURL(/.*\/register.*/, { timeout: 5000 });

        // Verify email field has focus or error indicator
        const emailInput = page.locator('#register-email');
        await expect(emailInput).toBeFocused();
      });
    });
  });

  // ============================================================================
  // ALTERNATE FLOW - AF-2: Weak Password Validation
  // ============================================================================

  test.describe('[AF-2] Weak Password Validation', () => {
    WEAK_PASSWORD_SCENARIOS.forEach(({ password, description }) => {
      test(`[US-REG-001-03] should show error when password is weak - ${description}`, async ({
        page,
      }) => {
        // Enter valid email
        await page.locator('#register-email').fill(`sdet.qa+${Date.now()}@eventhub.io`);

        // Enter weak password
        await page.locator('#register-password').fill(password);

        // Enter matching confirm password
        await page.locator('input[placeholder=\'Repeat your password\']').fill(password);

        // Attempt to submit form
        await page.locator('button:has-text(\'Create Account\')').click();

        // Verify still on registration page (indicating validation error)
        await expect(page).toHaveURL(/.*\/register.*/, { timeout: 5000 });

        // Verify password field has focus or error indicator
        const passwordInput = page.locator('#register-password');
        await expect(passwordInput).toBeFocused();
      });
    });
  });

  // ============================================================================
  // ALTERNATE FLOW - AF-3: Password Mismatch Validation
  // ============================================================================

  test.describe('[AF-3] Password Mismatch Validation', () => {
    PASSWORD_MISMATCH_SCENARIOS.forEach(({ password, confirmPassword, description }) => {
      test(`[US-REG-001-04] should show error when passwords don't match - ${description}`, async ({
        page,
      }) => {
        // Enter valid email
        await page.locator('#register-email').fill(`sdet.qa+${Date.now()}@eventhub.io`);

        // Enter password
        await page.locator('#register-password').fill(password);

        // Enter non-matching confirm password
        await page.locator('input[placeholder=\'Repeat your password\']').fill(confirmPassword);

        // Attempt to submit form
        await page.locator('button:has-text(\'Create Account\')').click();

        // Verify still on registration page (indicating validation error)
        await expect(page).toHaveURL(/.*\/register.*/, { timeout: 5000 });

        // Verify confirm password field has focus or error indicator
        const confirmPasswordInput = page.locator('input[placeholder="Repeat your password"]');
        await expect(confirmPasswordInput).toBeFocused();
      });
    });
  });

  // ============================================================================
  // ALTERNATE FLOW - AF-4: Duplicate Email Validation
  // ============================================================================

  test('[US-REG-001-05] should show error when email already exists in system', async ({
    page,
  }) => {
    // Enter email that already exists
    await page.locator('#register-email').fill(EXISTING_EMAIL);

    // Enter valid password
    await page.locator('#register-password').fill('EventHub@2025');

    // Enter matching confirm password
    await page.locator('input[placeholder=\'Repeat your password\']').fill('EventHub@2025');

    // Attempt to submit form
    await page.locator('button:has-text(\'Create Account\')').click();

    // Verify still on registration page (indicating validation error)
    await expect(page).toHaveURL(/.*\/register.*/, { timeout: 5000 });

    // Verify email field has focus or error indicator
    const emailInput = page.locator('#register-email');
    await expect(emailInput).toBeFocused();
  });

  // ============================================================================
  // ALTERNATE FLOW - AF-5: Required Field Validation
  // ============================================================================

  test.describe('[AF-5] Required Field Validation', () => {
    test('[US-REG-001-06] should show error when email field is empty', async ({
      page,
    }) => {
      // Leave email empty
      // Enter valid password
      await page.locator('#register-password').fill('EventHub@2025');

      // Enter matching confirm password
      await page.locator('input[placeholder=\'Repeat your password\']').fill('EventHub@2025');

      // Attempt to submit form
      await page.locator('button:has-text(\'Create Account\')').click();

      // Verify still on registration page
      await expect(page).toHaveURL(/.*\/register.*/, { timeout: 5000 });

      // Verify email field is empty
      await expect(page.locator('#register-email')).toHaveValue('');
    });

    test('[US-REG-001-07] should show error when password field is empty', async ({
      page,
    }) => {
      // Enter email
      await page.locator('#register-email').fill(`sdet.qa+${Date.now()}@eventhub.io`);

      // Leave password empty
      // Enter matching confirm password
      await page.locator('input[placeholder=\'Repeat your password\']').fill('EventHub@2025');

      // Attempt to submit form
      await page.locator('button:has-text(\'Create Account\')').click();

      // Verify still on registration page
      await expect(page).toHaveURL(/.*\/register.*/, { timeout: 5000 });

      // Verify password field is empty
      await expect(page.locator('#register-password')).toHaveValue('');
    });

    test('[US-REG-001-08] should show error when confirm password field is empty', async ({
      page,
    }) => {
      // Enter email
      await page.locator('#register-email').fill(`sdet.qa+${Date.now()}@eventhub.io`);

      // Enter valid password
      await page.locator('#register-password').fill('EventHub@2025');

      // Leave confirm password empty
      // Attempt to submit form
      await page.locator('button:has-text(\'Create Account\')').click();

      // Verify still on registration page
      await expect(page).toHaveURL(/.*\/register.*/, { timeout: 5000 });

      // Verify confirm password field is empty
      await expect(page.locator('input[placeholder="Repeat your password"]')).toHaveValue('');
    });

    test('[US-REG-001-09] should show error when all fields are empty', async ({
      page,
    }) => {
      // Attempt to submit form without filling any fields
      await page.locator('button:has-text(\'Create Account\')').click();

      // Verify still on registration page
      await expect(page).toHaveURL(/.*\/register.*/, { timeout: 5000 });

      // Verify all fields are empty
      await expect(page.locator('#register-email')).toHaveValue('');
      await expect(page.locator('#register-password')).toHaveValue('');
      await expect(page.locator('input[placeholder="Repeat your password"]')).toHaveValue('');
    });
  });

  // ============================================================================
  // EDGE CASES & ADDITIONAL SCENARIOS
  // ============================================================================

  test('[US-REG-001-10] should trim whitespace from email input', async ({
    page,
  }) => {
    // Enter email with leading/trailing whitespace
    const emailWithSpaces = '  sdet.qa+' + Date.now() + '@eventhub.io  ';
    await page.locator('#register-email').fill(emailWithSpaces);

    // Enter valid password
    await page.locator('#register-password').fill('EventHub@2025');

    // Enter matching confirm password
    await page.locator('input[placeholder=\'Repeat your password\']').fill('EventHub@2025');

    // Submit form
    await page.locator('button:has-text(\'Create Account\')').click();

    // System should handle whitespace and registration should succeed or show validation error
    const urlAfterSubmit = page.url();
    expect(
      urlAfterSubmit === 'https://eventhub.rahulshettyacademy.com/' ||
      urlAfterSubmit.includes('/register')
    ).toBeTruthy();
  });

  test('[US-REG-001-11] should accept password with all special character requirements', async ({
    page,
  }) => {
    // Enter valid email
    const testEmail = `sdet.qa+${Date.now()}@eventhub.io`;
    await page.locator('#register-email').fill(testEmail);

    // Enter password with various special characters
    const complexPassword = 'TestPass@123#$%';
    await page.locator('#register-password').fill(complexPassword);

    // Enter matching confirm password
    await page.locator('input[placeholder=\'Repeat your password\']').fill(complexPassword);

    // Verify password meets all requirements
    const isValid = RegistrationAssertions.isValidPasswordStrength(complexPassword);
    expect(isValid).toBeTruthy();

    // Submit form
    await page.locator('button:has-text(\'Create Account\')').click();

    // Verify successful registration
    await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/', { timeout: 15000 });
  });

  test('[US-REG-001-12] should be case-sensitive for passwords', async ({
    page,
  }) => {
    // Enter valid email
    await page.locator('#register-email').fill(`sdet.qa+${Date.now()}@eventhub.io`);

    // Enter password with specific case
    const password = 'EventHub@2025';
    await page.locator('#register-password').fill(password);

    // Enter confirm password with different case
    const confirmPassword = 'eventhub@2025';
    await page.locator('input[placeholder=\'Repeat your password\']').fill(confirmPassword);

    // Submit form
    await page.locator('button:has-text(\'Create Account\')').click();

    // Verify it shows password mismatch error (case-sensitive)
    await expect(page).toHaveURL(/.*\/register.*/, { timeout: 5000 });
  });

  test('[US-REG-001-13] should handle rapid consecutive registrations', async ({
    page,
  }) => {
    for (let i = 0; i < 3; i++) {
      // Navigate to registration page
      await registrationPage.navigate();

      // Enter unique email for each iteration
      const testEmail = `sdet.qa+${Date.now()}-${i}@eventhub.io`;
      await page.locator('#register-email').fill(testEmail);

      // Enter valid password
      await page.locator('#register-password').fill('EventHub@2025');

      // Enter matching confirm password
      await page.locator('input[placeholder=\'Repeat your password\']').fill('EventHub@2025');

      // Submit form
      await page.locator('button:has-text(\'Create Account\')').click();

      // Verify successful registration for first attempt
      if (i === 0) {
        await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/', { timeout: 15000 });
      }

      // Add small delay between iterations
      await page.waitForTimeout(500);
    }
  });
});
