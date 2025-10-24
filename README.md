# Playwright & TypeScript E2E Test Automation Framework

![CI](https://img.shields.io/github/actions/workflow/status/gmirandars/UITesting-PlayWright/playwright.yml?label=CI/CD&logo=github)
![Lint](https://img.shields.io/badge/code%20quality-ESLint%20%26%20Prettier-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)

This repository serves as a professional portfolio project, demonstrating a robust End-to-End (E2E) test automation framework built with Playwright and TypeScript. It showcases modern best practices in UI automation, including the Page Object Model (POM), a robust code quality setup (ESLint, Prettier, Husky), and a complete CI/CD pipeline using GitHub Actions.

The target application for this automation suite is **SauceDemo**, a live e-commerce demonstration website.

## 🚀 Key Features

- **Modern Framework**: Playwright for fast, reliable, cross-browser testing (Chromium, Firefox, WebKit).
- **TypeScript**: 100% strongly typed codebase for enhanced maintainability and reliability.
- **Page Object Model (POM)**: Clean, scalable architecture following SOLID and DRY principles.
- **Advanced Authentication Strategy**: Uses `global.setup.ts` to log in once and reuse authentication state.
- **Guaranteed Code Quality**:
  - ESLint & Prettier
  - Husky & lint-staged
  - TypeScript compiler validation (tsc)
- **CI/CD**: GitHub Actions runs tests and quality checks on each push and pull request.
- **Reports**: HTML report + traces for debugging.

## 🛠️ Tech Stack

| Category     | Technology         |
| ------------ | ------------------ |
| Test Runner  | Playwright         |
| Language     | TypeScript         |
| Code Quality | ESLint, Prettier   |
| Git Hooks    | Husky, lint-staged |
| CI/CD        | GitHub Actions     |

## 📁 Project Structure

```bash
project-playwright/
├── .github/workflows/      # CI/CD Pipeline
│   └── playwright.yml
├── .husky/                 # Git Hooks
│   └── pre-commit
├── src/
│   │── builders/
│   │   ├── builders...
│   │── data/
│   │   ├── providers...
│   │── interfaces/
│   │   ├── index.ts
│   ├── pages/              # Page Object Model (POM)
│   │   ├── pages...
│   └── setup/
│       └── global.setup.ts # Authentication reused across tests
├── tests/                  # Test Suites
│   ├── login.spec.ts
│   └── checkout.spec.ts
├── playwright.config.ts    # Playwright configuration
├── package.json            # Scripts and dependencies
├── tsconfig.json           # TypeScript configuration
├── eslint.config.js        # ESLINT configuration
└── .prettierrc             # Prettier configuration

```

## ✅ Example: Page Object (LoginPage.ts)

```ts
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  private usernameInput = this.page.locator('#user-name');
  private passwordInput = this.page.locator('#password');
  private loginButton = this.page.locator('#login-button');

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

## ✅ Example: Test File (login.spec.ts)

```ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test('User can log in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page.locator('.title')).toHaveText('Products');
});
```

## ⚙️ Setup & Installation

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
npm ci
npx playwright install --with-deps
```

## 🧪 Running Tests

```bash
# Run all tests (headless)
npm run test

# Run in UI Mode
npx playwright test --ui

# Run only login tests
npx playwright test tests/login.spec.ts
```

## 📊 View Reports

```bash
npx playwright show-report
```

## 🔄 CI/CD Pipeline (GitHub Actions)

- ✅ Runs on every push & pull request to `master`
- ✅ Installs dependencies & browsers
- ✅ Runs lint, type-check, and tests
- ✅ Uploads Playwright reports + traces as artifacts

---
