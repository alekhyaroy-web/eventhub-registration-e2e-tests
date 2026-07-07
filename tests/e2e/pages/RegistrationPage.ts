import { Page, expect } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly emailInput = 'input[placeholder="email"]';
  readonly passwordInput = 'input[placeholder="password"]';
  readonly confirmPasswordInput = 'input[placeholder="Retype password"]';
  readonly createAccountButton = 'button:has-text("Create Account")';
  readonly registrationForm = 'form';
  readonly successMessage = '.success-message, .alert-success, [class*="success"]';
  readonly errorMessage = '[class*="error"], [class*="alert"], .validation-error';

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to EventHub registration page
   */
  async navigateToRegistration(): Promise<void> {
    await this.page.goto('https://eventhub.rahulshettyacademy.com/register', {
      waitUntil: 'networkidle'
    });
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Fill email field with provided email
   */
  async fillEmail(email: string): Promise<void> {
    const emailField = await this.page.locator(this.emailInput).first();
    await emailField.waitFor({ state: 'visible', timeout: 5000 });
    await emailField.click();
    await emailField.clear();
    await emailField.fill(email);
  }

  /**
   * Fill password field with provided password
   */
  async fillPassword(password: string): Promise<void> {
    const passwordField = await this.page.locator(this.passwordInput).first();
    await passwordField.waitFor({ state: 'visible', timeout: 5000 });
    await passwordField.click();
    await passwordField.clear();
    await passwordField.fill(password);
  }

  /**
   * Fill confirm password field
   */
  async fillConfirmPassword(confirmPassword: string): Promise<void> {
    const confirmField = await this.page.locator(this.confirmPasswordInput);
    await confirmField.waitFor({ state: 'visible', timeout: 5000 });
    await confirmField.click();
    await confirmField.clear();
    await confirmField.fill(confirmPassword);
  }

  /**
   * Click Create Account button
   */
  async clickCreateAccount(): Promise<void> {
    const button = await this.page.locator(this.createAccountButton);
    await button.waitFor({ state: 'visible', timeout: 5000 });
    await button.click();
    // Wait for form processing
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  /**
   * Get email input value
   */
  async getEmailValue(): Promise<string | null> {
    return await this.page.locator(this.emailInput).first().inputValue();
  }

  /**
   * Get password input value
   */
  async getPasswordValue(): Promise<string | null> {
    return await this.page.locator(this.passwordInput).first().inputValue();
  }

  /**
   * Check if create account button is enabled
   */
  async isCreateAccountButtonEnabled(): Promise<boolean> {
    const button = await this.page.locator(this.createAccountButton);
    return await button.isEnabled();
  }

  /**
   * Get all error messages on the page
   */
  async getAllErrorMessages(): Promise<string[]> {
    const errors = await this.page.locator(this.errorMessage).allTextContents();
    return errors;
  }

  /**
   * Get success message
   */
  async getSuccessMessage(): Promise<string> {
    const message = await this.page.locator(this.successMessage);
    await message.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    return await message.textContent() || '';
  }

  /**
   * Clear all form fields
   */
  async clearAllFields(): Promise<void> {
    await this.page.locator(this.emailInput).first().clear().catch(() => {});
    await this.page.locator(this.passwordInput).first().clear().catch(() => {});
    await this.page.locator(this.confirmPasswordInput).clear().catch(() => {});
  }

  /**
   * Check if form is visible
   */
  async isFormVisible(): Promise<boolean> {
    return await this.page.locator(this.registrationForm).isVisible().catch(() => false);
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for success notification
   */
  async waitForSuccessNotification(timeout: number = 10000): Promise<void> {
    await this.page.locator(this.successMessage).waitFor({ 
      state: 'visible', 
      timeout 
    });
  }

  /**
   * Wait for error notification
   */
  async waitForErrorNotification(timeout: number = 5000): Promise<void> {
    await this.page.locator(this.errorMessage).waitFor({ 
      state: 'visible', 
      timeout 
    });
  }
}
