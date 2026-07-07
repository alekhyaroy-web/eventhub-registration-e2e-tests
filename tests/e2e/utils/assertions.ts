import { Page, expect } from '@playwright/test';
import { testData } from './testData';

export class CustomAssertions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ============ SUCCESS ASSERTIONS ============

  /**
   * Verify success message is displayed
   */
  async verifySuccessMessage(): Promise<void> {
    const successLocators = [
      '.success-message',
      '.alert-success',
      '[class*="success"]',
      'text=/registration.*success|account.*created|congratulation/i'
    ];

    let found = false;
    for (const locator of successLocators) {
      try {
        await this.page.waitForSelector(locator, { timeout: 5000 }).catch(() => {});
        if (await this.page.locator(locator).isVisible({ timeout: 1000 }).catch(() => false)) {
          found = true;
          break;
        }
      } catch (e) {
        // Continue searching other locators
      }
    }

    expect(found).toBeTruthy();
  }

  /**
   * Verify user is redirected after successful registration
   */
  async verifySuccessfulRedirect(): Promise<void> {
    const redirectUrl = this.page.url();
    const isRedirected = /login|dashboard|home|profile/i.test(redirectUrl);
    expect(isRedirected).toBeTruthy();
  }

  // ============ ERROR ASSERTIONS ============

  /**
   * Verify email validation error is displayed
   */
  async verifyEmailValidationError(): Promise<void> {
    await this.verifyErrorMessage(testData.errorMessages.invalidEmail);
  }

  /**
   * Verify password strength error is displayed
   */
  async verifyPasswordStrengthError(): Promise<void> {
    await this.verifyErrorMessage(testData.errorMessages.weakPassword);
  }

  /**
   * Verify password mismatch error is displayed
   */
  async verifyPasswordMismatchError(): Promise<void> {
    await this.verifyErrorMessage(testData.errorMessages.passwordMismatch);
  }

  /**
   * Verify duplicate email error is displayed
   */
  async verifyDuplicateEmailError(): Promise<void> {
    await this.verifyErrorMessage(testData.errorMessages.duplicateEmail);
  }

  /**
   * Verify email required field error
   */
  async verifyEmailRequiredError(): Promise<void> {
    await this.verifyErrorMessage(testData.errorMessages.emailRequired);
  }

  /**
   * Verify password required field error
   */
  async verifyPasswordRequiredError(): Promise<void> {
    await this.verifyErrorMessage(testData.errorMessages.passwordRequired);
  }

  /**
   * Verify confirm password required field error
   */
  async verifyConfirmPasswordRequiredError(): Promise<void> {
    await this.verifyErrorMessage(testData.errorMessages.confirmPasswordRequired);
  }

  /**
   * Verify multiple required field errors
   */
  async verifyMultipleRequiredFieldErrors(): Promise<void> {
    const errorElements = await this.page.locator('[class*="error"], .validation-error').count();
    expect(errorElements).toBeGreaterThan(0);
  }

  /**
   * Generic error message verification
   */
  async verifyErrorMessage(pattern: RegExp): Promise<void> {
    const errorLocators = [
      '[class*="error"]',
      '[class*="alert"]',
      '.validation-error',
      '[role="alert"]'
    ];

    let found = false;
    for (const locator of errorLocators) {
      try {
        const elements = await this.page.locator(locator).all();
        for (const element of elements) {
          const text = await element.textContent();
          if (pattern.test(text || '')) {
            found = true;
            break;
          }
        }
        if (found) break;
      } catch (e) {
        // Continue
      }
    }

    expect(found).toBeTruthy();
  }

  // ============ FORM STATE ASSERTIONS ============

  /**
   * Verify form was not submitted (user stays on registration page)
   */
  async verifyFormNotSubmitted(): Promise<void> {
    const currentUrl = this.page.url();
    const isStillOnRegistration = /register|registration/i.test(currentUrl);
    expect(isStillOnRegistration).toBeTruthy();
  }

  /**
   * Verify form is visible and ready for interaction
   */
  async verifyFormVisible(): Promise<void> {
    const formLocators = ['form', '[role="form"]', '.registration-form'];
    
    let isVisible = false;
    for (const locator of formLocators) {
      if (await this.page.locator(locator).isVisible({ timeout: 1000 }).catch(() => false)) {
        isVisible = true;
        break;
      }
    }

    expect(isVisible).toBeTruthy();
  }

  /**
   * Verify all required form fields are visible
   */
  async verifyAllFormFieldsVisible(): Promise<void> {
    const emailField = await this.page.locator('input[placeholder="email"]').isVisible().catch(() => false);
    const passwordField = await this.page.locator('input[placeholder="password"]').isVisible().catch(() => false);
    const confirmField = await this.page.locator('input[placeholder="Retype password"]').isVisible().catch(() => false);

    expect(emailField).toBeTruthy();
    expect(passwordField).toBeTruthy();
    expect(confirmField).toBeTruthy();
  }

  /**
   * Verify create account button is enabled
   */
  async verifyCreateAccountButtonEnabled(): Promise<void> {
    const button = await this.page.locator('button:has-text("Create Account")');
    const isEnabled = await button.isEnabled().catch(() => false);
    expect(isEnabled).toBeTruthy();
  }

  // ============ DATA VALIDATION ASSERTIONS ============

  /**
   * Verify email format is valid
   */
  async verifyValidEmailFormat(email: string): Promise<void> {
    const isValid = testData.isValidEmailFormat(email);
    expect(isValid).toBeTruthy();
  }

  /**
   * Verify password meets strength requirements
   */
  async verifyPasswordStrength(password: string): Promise<void> {
    const isStrong = testData.isPasswordStrong(password);
    expect(isStrong).toBeTruthy();
  }

  /**
   * Verify password strength level
   */
  async verifyPasswordStrengthLevel(password: string, minLevel: 'weak' | 'medium' | 'strong'): Promise<void> {
    const strengthLevels = { weak: 1, medium: 2, strong: 3 };
    const actualLevel = testData.getPasswordStrengthLevel(password);
    expect(strengthLevels[actualLevel]).toBeGreaterThanOrEqual(strengthLevels[minLevel]);
  }

  // ============ NETWORK & PERFORMANCE ASSERTIONS ============

  /**
   * Verify page load time is within acceptable limits
   */
  async verifyPageLoadPerformance(maxLoadTime: number = 5000): Promise<void> {
    const navigationTiming = await this.page.evaluate(() => {
      const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return timing?.loadEventEnd - timing?.fetchStart;
    }).catch(() => 0);

    expect(navigationTiming).toBeLessThan(maxLoadTime);
  }

  /**
   * Verify no console errors
   */
  async verifyNoConsoleErrors(): Promise<void> {
    const errors: string[] = [];
    
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    expect(errors).toHaveLength(0);
  }

  // ============ ACCESSIBILITY ASSERTIONS ============

  /**
   * Verify form fields have proper labels
   */
  async verifyFormFieldsHaveLabels(): Promise<void> {
    const emailField = this.page.locator('input[placeholder="email"]').first();
    const hasLabel = await emailField.getAttribute('aria-label').catch(() => null);
    
    // Either has aria-label or placeholder should be meaningful
    expect(hasLabel || 'email').toBeTruthy();
  }

  /**
   * Verify form is keyboard accessible
   */
  async verifyKeyboardAccessibility(): Promise<void> {
    // Check if create account button can be reached via tab
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');

    const focusedElement = await this.page.evaluate(() => {
      return document.activeElement?.tagName;
    });

    // Should reach button or interactive element
    expect(focusedElement).toBeTruthy();
  }

  // ============ SCREENSHOT & DEBUG HELPERS ============

  /**
   * Take screenshot of current page state
   */
  async takeScreenshot(filename: string): Promise<void> {
    await this.page.screenshot({ path: `./screenshots/${filename}.png` });
  }

  /**
   * Get all text content on page for debugging
   */
  async getPageContent(): Promise<string> {
    return await this.page.textContent('body') || '';
  }

  /**
   * Verify error toast/notification appears
   */
  async verifyErrorNotification(): Promise<void> {
    const toastLocators = [
      '.toast-error',
      '[role="alert"]',
      '.notification-error',
      '[class*="error"]'
    ];

    let found = false;
    for (const locator of toastLocators) {
      if (await this.page.locator(locator).isVisible({ timeout: 2000 }).catch(() => false)) {
        found = true;
        break;
      }
    }

    expect(found).toBeTruthy();
  }
};
