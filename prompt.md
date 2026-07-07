# EventHub User Registration - E2E Test Automation Prompt

## Context
As a Senior SDET with 7+ years of test automation expertise and 3+ years in prompt engineering, I'm designing a comprehensive end-to-end test suite for the EventHub User Registration module. This prompt orchestrates automated test development with integration to GitHub for version control and collaboration.

---

## Objective
Generate a production-grade Playwright end-to-end test suite for the EventHub user registration flow (https://eventhub.rahulshettyacademy.com/register) that implements the full user journey as per US-REG-001 specification, with proper error handling, assertions, and best practices. The generated code should be automatically committed and pushed to the GitHub repository.

---

## Requirements

### 1. Test Coverage - Main Flow
Implement comprehensive test cases covering:

**Primary Flow (Happy Path):**
- Navigate to registration page
- Enter valid email (unique, properly formatted)
- Enter strong password meeting security requirements (min 8 chars, uppercase, lowercase, numbers, special chars)
- Confirm password (matching first entry)
- Click "Create Account" button
- Verify success message display
- Validate account creation (check user data in system)
- Verify redirect to Login/Dashboard
- Validate user session state

**Alternate Flows (Error Scenarios):**
- AF-1: Invalid email format validation (reject special patterns, malformed domains)
- AF-2: Weak password validation (test minimum length, character requirements)
- AF-3: Password mismatch validation (confirm vs password fields)
- AF-4: Duplicate email validation (existing account detection)
- AF-5: Required field validation (missing email, missing password, missing confirm)

### 2. Technical Implementation Standards

**Playwright Configuration:**
- Use Chromium, Firefox, and WebKit browser engines for cross-browser validation
- Implement proper timeouts and wait strategies
- Use page fixtures and context managers for test isolation
- Implement screenshot capture on failures for debugging
- Configure retry mechanism for flaky tests
- Use test.describe() for logical grouping

**Code Quality:**
- Follow Page Object Model (POM) pattern with separate page classes
- Implement helper utilities for common actions (login, registration, assertions)
- Use data-driven testing with test parameters
- Implement proper logging and debug output
- Add comprehensive comments and docstrings
- Ensure code follows ESLint and Prettier standards

**Performance & Reliability:**
- Implement proper waits (waitForLoadState, waitForSelector)
- Use reliable selectors (prefer data-testid over CSS/XPath where possible)
- Implement retry logic for transient failures
- Add network request interception for stubbing APIs (if needed)
- Validate both UI and backend state changes

### 3. Test Structure

**File Organization:**
```
tests/
  ├── e2e/
  │   ├── registration/
  │   │   ├── registration.spec.ts (main test file)
  │   │   └── registration.setup.ts (test data & fixtures)
  │   └── pages/
  │       └── RegistrationPage.ts (Page Object Model)
  ├── utils/
  │   ├── testData.ts (test data constants)
  │   └── assertions.ts (custom assertion helpers)
  └── config/
      └── test.config.ts (test environment config)
```

**Test Naming Convention:**
- Use descriptive names: `test('should successfully register with valid credentials')`
- Include scenario identifier: `[REG-001-01]`, `[REG-001-AF1]`
- Format: `test('[ID] should [expected behavior] when [precondition]')`

### 4. Assertion & Validation Strategy

**UI Assertions:**
- Verify form field rendering and visibility
- Validate error message displays (inline validation messages)
- Check button state changes (enabled/disabled)
- Verify success page/message rendering
- Validate URL changes on redirect

**Data Assertions:**
- Backend validation via API calls (if available)
- Database state verification
- User creation timestamp validation
- Account status verification (active/inactive)

### 5. Test Data Management

**Valid Test Data:**
```
Email patterns: 
  - user+timestamp@example.com
  - valid.user@domain.co.uk
  - new_user123@test-domain.com

Strong password pattern:
  - MySecure123!Pass
  - TestPass@2025
  - ValidPwd#123
```

**Invalid Test Data:**
```
Invalid emails:
  - plaintext
  - @example.com
  - user@domain
  - user@.com

Weak passwords:
  - password
  - pass123
  - Pass
```

### 6. GitHub Integration Requirements

**Repository Setup:**
- Create/update GitHub repository with proper structure
- Implement branch naming: `feat/test-registration-e2e`
- Create feature branch before committing changes

**Commit Strategy:**
- Initial commit: "feat: add EventHub user registration E2E test suite"
- Include test file, page objects, utilities, and configuration
- Add .gitignore for test artifacts (screenshots, videos, traces)

**Pull Request:**
- Create PR with comprehensive description
- Include test coverage summary
- Reference user story: "Closes US-REG-001"
- Add labels: `automation`, `registration`, `e2e`

---

## Implementation Specifications

### Technology Stack
- **Framework:** Playwright (TypeScript)
- **Test Runner:** Playwright Test (npx playwright test)
- **Assertions:** Playwright built-in + custom helpers
- **CI/CD:** GitHub Actions ready
- **Reporting:** HTML reporter with screenshots/videos

### Best Practices to Implement

1. **Isolation:** Each test should be independent and not rely on execution order
2. **Clarity:** Test names should clearly describe what is being tested
3. **Maintenance:** Use abstraction layers (POM) to reduce brittle selectors
4. **Performance:** Optimize wait strategies; avoid hardcoded sleeps
5. **Debugging:** Capture screenshots/videos on failure automatically
6. **Documentation:** Include README with setup instructions and test execution guide

### Configuration & Setup

**playwright.config.ts:**
- Configure multiple browsers and devices
- Set timeouts appropriately (30s global, 5s navigation)
- Enable screenshot and trace capture on failures
- Configure HTML reporter
- Set up base URL: https://eventhub.rahulshettyacademy.com

**Environment Setup:**
- Document Node.js version requirement (16+)
- Include npm dependencies installation
- Document test execution commands

---

## Execution Instructions

### Local Test Execution
```bash
# Install dependencies
npm install

# Run all tests
npx playwright test

# Run specific test file
npx playwright test registration.spec.ts

# Run with UI mode for debugging
npx playwright test --ui

# Run specific test with headed browser
npx playwright test --headed
```

### GitHub Integration Flow
1. Generate complete test suite with all files
2. Commit all files: `git add .`
3. Create feature branch and commit: `git commit -m "feat: add EventHub user registration E2E test suite"`
4. Push to GitHub repository
5. Create Pull Request with standard template
6. Include test execution evidence in PR description

---

## Deliverables

✅ Complete Playwright E2E test suite for user registration
✅ Page Object Model implementation for RegistrationPage
✅ Test utilities and helper functions
✅ Test data management module
✅ playwright.config.ts with proper configuration
✅ .gitignore for test artifacts
✅ README.md with setup and execution instructions
✅ GitHub repository integration and PR creation

---

## Success Criteria

1. All test cases execute successfully with 100% pass rate on first run
2. Code follows TypeScript best practices and ESLint standards
3. Tests are maintainable with clear naming and documentation
4. Cross-browser execution validated (Chromium, Firefox, WebKit)
5. Proper error handling and assertions throughout
6. GitHub repository updated with clean commit history
7. PR created with comprehensive documentation

---

## Notes for Implementation

- Prioritize test stability over speed
- Use explicit waits with proper locators
- Implement data cleanup/teardown if needed
- Consider test ordering for performance (independent tests can run in parallel)
- Document any workarounds for application-specific issues
- Include error scenarios with meaningful validation messages

This prompt instructs the AI to generate production-ready automation code that demonstrates enterprise-level SDET practices with modern tooling and methodologies.
