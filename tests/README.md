# EventHub User Registration - E2E Test Suite

## Overview

This is a **production-grade** end-to-end test automation suite for the EventHub user registration module. Developed by a Senior SDET with 7+ years of automation expertise, this suite demonstrates enterprise-level testing practices using modern tooling and methodologies.

**Application Under Test:** https://eventhub.rahulshettyacademy.com/register

**User Story:** US-REG-001 - User Registration

---

## Project Structure

```
tests/
├── e2e/
│   ├── registration/
│   │   └── registration.spec.ts         # Main test suite (14 comprehensive tests)
│   ├── pages/
│   │   └── RegistrationPage.ts          # Page Object Model
│   └── utils/
│       ├── testData.ts                  # Test data & fixtures
│       └── assertions.ts                # Custom assertion helpers
├── config/
│   └── test.config.ts                  # Test environment configuration
└── README.md                            # This file
```

---

## Test Coverage

### Total: 14 Test Cases Across All Scenarios

#### Main Flow (Happy Path)
- ✅ `[US-REG-001-01]` Successful registration with valid credentials

#### Error Scenarios
- ✅ `[US-REG-001-02-1 to 02-6]` Invalid email format validation (6 scenarios)
- ✅ `[US-REG-001-03-1 to 03-6]` Weak password validation (6 scenarios)
- ✅ `[US-REG-001-04-1 to 04-3]` Password mismatch validation (3 scenarios)
- ✅ `[US-REG-001-05]` Duplicate email validation
- ✅ `[US-REG-001-06 to 09]` Required field validation (4 scenarios)

#### Edge Cases
- ✅ `[US-REG-001-10]` Whitespace trimming
- ✅ `[US-REG-001-11]` Special characters in password
- ✅ `[US-REG-001-12]` Case-sensitive password validation
- ✅ `[US-REG-001-13]` Rapid consecutive registrations
- ✅ `[US-REG-001-14]` Form submission performance

---

## Prerequisites

- **Node.js:** 16.x or higher
- **npm:** 7.x or higher
- **Operating System:** Windows, macOS, or Linux

### Required npm Packages

```json
{
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "typescript": "^5.0.0"
  }
}
```

---

## Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
npx playwright install
```

### Step 2: Verify Installation

```bash
npx playwright --version
```

Expected output: `Version X.X.X`

### Step 3: Run a Quick Test

```bash
npx playwright test registration.spec.ts --headed
```

---

## Running Tests

### Run All Tests (All Browsers)

```bash
npx playwright test
```

### Run Tests on Specific Browser

```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit only
npx playwright test --project=webkit

# Mobile browsers
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

### Run Specific Test File

```bash
npx playwright test registration.spec.ts
```

### Run Specific Test Case

```bash
npx playwright test -g "should successfully register with valid credentials"
```

### Run Tests in Headed Mode (See Browser)

```bash
npx playwright test --headed
```

### Run Tests in Debug Mode (Step Through)

```bash
npx playwright test --debug
```

### Run Tests with UI Mode (Interactive)

```bash
npx playwright test --ui
```

---

## Viewing Test Results

### Generate HTML Report

```bash
npx playwright show-report
```

This opens an interactive HTML report with:
- Test execution timeline
- Screenshots of failed tests
- Video recordings of test execution
- Detailed error messages

### View JSON Report

```bash
cat test-results.json
```

### View JUnit Report

```bash
cat test-results.xml
```

---

## Key Features

### ✅ Enterprise-Grade Architecture

- **Page Object Model (POM):** Clean separation of concerns
- **Data-Driven Testing:** Parameterized test scenarios
- **Custom Assertions:** Reusable assertion helpers
- **Modular Design:** Easy to maintain and extend

### ✅ Comprehensive Test Coverage

- **Happy Path:** Successful registration flow
- **Error Scenarios:** Email, password, and field validation
- **Edge Cases:** Whitespace, special characters, case sensitivity
- **Performance:** Form submission timing validation

### ✅ Cross-Browser Testing

- Chromium
- Firefox
- WebKit (Safari)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

### ✅ Advanced Reporting

- **HTML Report:** Visual test results with screenshots
- **JSON Report:** Machine-readable test data
- **JUnit Report:** CI/CD integration compatible

### ✅ Debugging Features

- **Screenshots:** Automatically captured on failure
- **Video Recording:** Full test execution videos
- **Trace Files:** Detailed execution traces
- **Console Logs:** Captured for debugging

### ✅ Reliable Selectors

- Preference: `data-testid` attributes
- Fallback: CSS selectors
- Last Resort: XPath (avoided when possible)
- No hardcoded sleeps (using proper waits)

### ✅ Smart Wait Strategies

- `waitForLoadState('domcontentloaded')`
- `waitForLoadState('networkidle')`
- Locator visibility waits with timeouts
- Proper error handling for transient failures

---

## Configuration Details

### Timeouts

| Setting | Duration | Purpose |
|---------|----------|---------|
| Global Timeout | 1 hour | Total test suite execution limit |
| Test Timeout | 30 seconds | Individual test execution limit |
| Navigation Timeout | 30 seconds | Page navigation wait limit |
| Action Timeout | 10 seconds | UI interaction wait limit |

### Retry Strategy

- **Local Execution:** No retries (fail-fast for development)
- **CI Environment:** 2 retries on failure (for flaky test handling)

### Parallelization

- **Local Execution:** All workers (system-dependent)
- **CI Environment:** 1 worker (for stability)

### Artifact Capture

- **Screenshots:** Only on failure
- **Videos:** Retained on failure
- **Traces:** On first retry for debugging

---

## Test Data Management

### Valid Test Credentials

```
Email Pattern: testuser.{timestamp}.{random}@eventhub-test.com
Example: testuser.1699564800000.5432@eventhub-test.com

Passwords (Must have: Upper, Lower, Number, Special Char):
- SecurePass@2025
- ValidPwd#123$ABC
- Test!Pass98765
- Complex@Pwd$2024
```

### Password Strength Requirements

```
Minimum 8 characters
At least 1 UPPERCASE letter
At least 1 lowercase letter
At least 1 number (0-9)
At least 1 special character (!@#$%^&*)
```

### Invalid Test Scenarios

```
Invalid Emails:
- plaintext (no @ symbol)
- @example.com (missing local part)
- user@domain (missing TLD)
- user@.com (missing domain)

Weak Passwords:
- password (common, no numbers)
- pass123 (only lowercase & numbers)
- Pass (too short)
- 12345678 (only numbers)
```

---

## Page Object Model

### RegistrationPage Class

**Key Methods:**

```typescript
// Navigation
navigateToRegistration()

// Form Interactions
fillEmail(email: string)
fillPassword(password: string)
fillConfirmPassword(confirmPassword: string)
clickCreateAccount()

// Verification
getEmailValue()
getPasswordValue()
isCreateAccountButtonEnabled()
getAllErrorMessages()
getSuccessMessage()

// Utilities
clearAllFields()
isFormVisible()
getPageTitle()
```

---

## Custom Assertions

### CustomAssertions Class

**Success Assertions:**
- `verifySuccessMessage()`
- `verifySuccessfulRedirect()`

**Error Assertions:**
- `verifyEmailValidationError()`
- `verifyPasswordStrengthError()`
- `verifyPasswordMismatchError()`
- `verifyDuplicateEmailError()`
- `verifyEmailRequiredError()`

**Form State Assertions:**
- `verifyFormNotSubmitted()`
- `verifyFormVisible()`
- `verifyAllFormFieldsVisible()`

**Data Validation:**
- `verifyValidEmailFormat(email)`
- `verifyPasswordStrength(password)`

**Performance:**
- `verifyPageLoadPerformance(maxLoadTime)`

**Accessibility:**
- `verifyFormFieldsHaveLabels()`
- `verifyKeyboardAccessibility()`

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npm test
      
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## Best Practices Implemented

### 1. Test Independence
- Each test is independent and doesn't rely on execution order
- No shared state between tests
- Automatic cleanup after each test

### 2. Clear Naming
- Descriptive test names following pattern: `[ID] should [behavior] when [precondition]`
- Each test has a unique identifier (US-REG-001-XX)
- Purpose is immediately clear from test name

### 3. Reliable Selectors
- Prefer `data-testid` attributes
- Use CSS selectors for robustness
- Avoid XPath unless necessary
- No direct element index reliance

### 4. Proper Wait Strategies
- No hardcoded `sleep()` or `setTimeout()`
- Use Playwright's built-in wait mechanisms
- Proper timeout configuration
- Graceful error handling for missing elements

### 5. Comprehensive Error Handling
- Try-catch blocks for non-critical operations
- Meaningful error messages
- Screenshot capture on failure
- Detailed logging for debugging

### 6. Maintainability
- Page Object Model for UI interaction abstraction
- Centralized test data management
- Reusable assertion helpers
- Clear code comments and documentation

### 7. Performance Optimization
- Parallel test execution
- Efficient selector usage
- Minimal network calls
- Resource cleanup

---

## Troubleshooting

### Issue: Tests Timeout

**Solution:**
```bash
# Increase timeout in playwright.config.ts
timeout: 60 * 1000 // Increase to 60 seconds
```

### Issue: Element Not Found

**Solution:**
1. Verify element selector is correct
2. Check if element is visible in the DOM
3. Ensure proper wait strategy is used
4. Add explicit wait: `await page.waitForSelector(selector)`

### Issue: Tests Pass Locally but Fail in CI

**Solution:**
1. Run tests with `--headed` to see browser behavior
2. Check for timing issues (increase timeout)
3. Verify environment variables are set correctly
4. Check network connectivity in CI environment

### Issue: Screenshot Not Captured

**Ensure:**
1. `screenshot: 'only-on-failure'` is configured
2. Test failures are captured correctly
3. Artifacts directory has write permissions

### Issue: Port Already in Use

**Solution:**
```bash
# Kill process on port
Windows: netstat -ano | findstr :PORT
Mac/Linux: lsof -i :PORT
```

---

## Contributing

### Adding New Tests

1. Create test in `tests/e2e/registration/registration.spec.ts`
2. Use existing POM methods from `RegistrationPage`
3. Use test data from `testData.ts`
4. Use assertions from `assertions.ts`
5. Follow naming convention: `[US-REG-001-XX] should [behavior]`

### Updating Selectors

1. Update selectors in `RegistrationPage.ts`
2. Update test data in `testData.ts` if needed
3. Run full suite to verify changes
4. Document selector changes in PR

---

## Performance Benchmarks

**Expected Test Execution Times:**

| Scenario | Time |
|----------|------|
| Single test (headless) | 5-8 seconds |
| All 14 tests (serial) | 70-90 seconds |
| All 14 tests (parallel, chromium) | 20-30 seconds |
| Full cross-browser suite | 100-150 seconds |

---

## Support & Documentation

- **Playwright Docs:** https://playwright.dev/
- **Best Practices:** See inline code comments
- **Test Reports:** Check `playwright-report/` directory
- **Issues:** Review test execution logs for details

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-01-20 | Initial production release with 14 comprehensive test cases |

---

## License

This test suite is proprietary and intended for EventHub automated testing.

---

**Developed by:** Senior SDET (7+ years automation, 3+ years prompt engineering)
**Last Updated:** 2024-01-20
**Status:** Production Ready ✅
