# Playwright Automation Project 🎭

Hi! This is my first automation project. I built this to practice test automation using Playwright with JavaScript.

I used [AutomationExercise.com](https://automationexercise.com) as the test website because it has all the features of a real e-commerce site like login, products, cart, and checkout.

---

## What I Used
- Playwright (for automation)
- JavaScript
- Node.js
- Page Object Model (design pattern)
- GitHub Actions (CI/CD)

---

## What I Learned
- How to write automated test cases
- How to use Page Object Model to organize code
- How to work with locators and selectors
- How to handle dynamic elements and popups
- How to run tests on multiple browsers
- How to generate HTML reports
- How to push code to GitHub

---

## Project Structure
```
├── Pages/                   → Page Object classes
│   ├── homePage.js
│   ├── loginPage.js
│   ├── registerPage.js
│   ├── productPage.js
│   ├── cartPage.js
│   ├── checkoutPage.js
│   └── contactPage.js
├── tests/                   → Test files
│   ├── auth.spec.js
│   ├── products.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   └── ui.spec.js
├── test-data/
│   └── users.json           → Test data
└── playwright.config.js     → Configuration
```

---

## Test Cases I Automated (20 Total)

### Authentication (5)
- TC1 - Register a new user
- TC2 - Login with correct credentials
- TC3 - Login with wrong credentials
- TC4 - Logout user
- TC5 - Register with already existing email

### Products (4)
- TC8 - Verify all products page and product details
- TC9 - Search for a product
- TC18 - View products by category
- TC19 - View products by brand

### Cart (5)
- TC12 - Add products to cart
- TC13 - Verify product quantity in cart
- TC17 - Remove product from cart
- TC20 - Verify cart products after login
- TC22 - Add recommended product to cart

### Checkout (2)
- TC16 - Place order after login
- TC23 - Verify address details in checkout page

### UI (4)
- TC6 - Submit contact us form with file upload
- TC7 - Verify test cases page
- TC10 - Subscribe from home page
- TC11 - Subscribe from cart page

---

## How to Run

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install

# Run all tests
npx playwright test --project=brave

# Run specific file
npx playwright test auth.spec.js --project=brave

# Run with browser visible
npx playwright test --headed --project=brave

# See HTML report
npx playwright show-report
```

---

## Author
**Hanok Chinni**  
[GitHub Profile](https://github.com/hanokchinni)
