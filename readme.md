# BASICS OF PLAYWRIGHT FRAMEWORK

## What is Playwright?

End-to-end automated testing tool  
Available in various languages:

- TypeScript
- JavaScript
- Python
- .NET
- Java  
  Allows testing of both front-end and back-end

## Forms of Playwright

- Playwright Test (`@playwright/test`) enhanced with Test Runner (test execution tool)
- Library for browser interaction (Playwright Library)
- Low-level API (`playwright-core`) for clients (e.g., libraries)

## What does Test Runner with Playwright Test offer?

#### Test Runner is available only in JavaScript/TypeScript

- Simple test configuration
- Easy test parallelization (allows automatic subdivision of test suites into smaller subsets, each can be run in a separate worker process)
- Visual testing (comparing the appearance of a page)
- Custom assertions
- Dependent tests and dependent projects
- Reports (html, json, line, custom)
- VS Code plugin (test execution from IDE, test recording, test debugging)
- UI mode (Easy test management, execution, analysis, and debugging)

#### Additional benefits of Playwright Test:

- Extensible configuration (inheritable) with numerous settings
- Projects (with dependencies, sessions, devices, and test scopes)
- Screenshots, video, trace, annotations, tags
- Parallelization and retrying of failed tests
- Global settings, pre-test, suite, or test settings
- Global timeouts, test, action, assertion, fixture, navigation
- Automatic application launching and setup for testing

## Playwright Test in languages other than JavaScript/TypeScript?

- There won't be Playwright Test for other languages in the near future
- There are tools that offer similar functionalities (e.g., test parallelization) - require implementation and maintenance
- About 70-80% of Playwright downloads are TS/JS versions - this indicates significantly less interest in other languages (\* no statistics for JAVA)

## What if we want to use only Playwright in other languages like Python, .Net, Java?

Then we can configure external tools.

- Test runners examples: pytest, MSTest, NUnit, TestNG
- Reporters examples: Allure, reportportal

### Not all features available in Playwright Test are available in these external tools.

What's missing:

- Sequential tests, steps
- Soft assertions
- Reports with trace, video, and screenshot
- Global timeout configurations

## Playwright Limitations

- Lack of support for older browser versions
- No native support for BDD
- No support for mobile devices - Real Devices - only Android experimentally
- All-in-one - many options and capabilities can also be a disadvantage, as we may not need to use all its features
- Test writing style based on JavaScript and TypeScript - need to use async/await or then and cannot utilize method chaining (as in Cypress)

### How to speed up test execution

- Split test files and utilize projects to effectively use workers
- If possible, use `parallel` mode or switch to `fullyParallel` mode
- Utilize API interface (sending requests, modifying/mocking requests)
- Introduce sharding into CI/CD pipelines

---

---

# Knowledge summary - Test Automation training from jaktestowac.pl

This is a Test Automation project based on `Playwright` and `TypeScript`.  
The tested page is a simple demo of a bank.

- [Links](#links)
- [Commands](#commands)
- [Visual Studio Code](#visual-studio-code)
- [Extensions](#extensions)
- [Playwright](#playwright)
- [Other](#other)
- [Simple Page Object Model](#simple-page-object-model)

## Links

- course https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site https://demo-bank.vercel.app/
- code repository https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie

## Commands

- check `NodeJS` version  
  `node -v`
- new project with Playwright  
  `npm init playwright@latest`
- record tests for given site  
  `npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
  `npx playwright test`
- run tests with browser GUI  
  `npx playwright test --headed`
- view report  
  `npx playwright show-report`
- run Trace Viewer on zip file  
  `npx playwright show-trace trace.zip`
- run tests form exact file  
  `npx playwright test tests/login.spec.ts`

### Updating Playwright

- check if Playwright should be updated  
  `npm outdated @playwright/test`
- update Playwright  
  `npm i @playwright/test`
- update browsers  
  `npx playwright install`
- verify Playwright version  
  `npx @playwright/test --version`

## Visual Studio Code

### Functions

- Preview: for README.md
- Autosave: in File -> Auto Save
- Timeline: file context menu -> Open Timeline
- Formatting: editor -> context menu -> Format Document
- Formatting shortcut: <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd>
- Searching: editor -> <kbd>CTRL</kbd> + <kbd>F</kbd>
- Accept hint in editor: <kbd>Enter</kbd>
- Comment/Uncomment: <kbd>Ctrl</kbd> + <kbd>/</kbd>
- Duplicate line: <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>↑</kbd>
- Extract to variable: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd>
- Move line i.e. up: <kbd>Alt</kbd> + <kbd>↑</kbd>
- Show autocomplete suggestion: <kbd>Ctrl</kbd> + <kbd>Spacebar</kbd>
- Format code on save:
  - Top menu: View -> Open Command Palette
  - Type: user settings - chose `Preferences: Open User Settings`
  - Search: format on save
  - Edit: check `Editor Format On Save`

### Terminal (console)

- Open: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>`</kbd>
- Cancelling Node process: hit twice <kbd>Ctrl</kbd> + <kbd>C</kbd>
- Open file: <kbd>Ctrl</kbd> + mouse click
- Autocomplete: <kbd>Tab</kbd>
- Paste in terminal shortcuts:
  - <kbd>Ctrl</kbd> + <kbd>V</kbd>
  - <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd>
  - <kbd>Shift</kbd> + <kbd>Insert</kbd>
  - right mouse button
- Use more than one terminal: <kbd>+</kbd> sign in TERMINAL
- Use another terminal (Git Bash, JavaScript Debug): <kbd>˅</kbd> sign in TERMINAL

To quickly evaluate code use `DEBUG CONSOLE`.

### Plugins

- GitLens - view details of your repository i.e. commits history
- Prettier - default formatter for editor
- Playwright Test for VSCode - run and record tests form VSC

---

---

## Playwright

### Playwright Config modifications

- config file `playwright.config.ts`
- disable browsers, i.e. Firefox
  ```javascript
  // {
  //   name: 'firefox',
  //   use: {
  //     ...devices['Desktop Firefox'],
  //   },
  // },
  ```
- enable video on failure
  ```javascript
  use: {
      video: {'retain-on-failure'},
  },
  ```
- enable Trace Viewer on failure
  ```javascript
  use: {
      trace: {'retain-on-failure'},
  },
  ```

## Playwright snippets & tips

- test:
  ```javascript
  test('test description', async ({ page }) => {});
  ```
- describe: grouping tests into a logical whole using `test.describe` helps improve the readability of tests from the same area:
  ```javascript
   describe('Group description', () => {
      test 1
      test 2
      test 3
   });
  ```
- running one test: `test.only`  
  If you are working on a new test and do not want to run the full suite of extra `test.only` with a given test, only those tests will be fired upon execution, e.g.. `test.only('login test', async ({ page }) => {});`  
   `    TIP: Remember to remove this option after testing a particular test 😀`
- if you want to lose focus from an element, use the `blur()` function, example:

  ```javascript
  await page.getByTestId('password-input').click(); // setting the focus on the password entry window
  await page.getByTestId('password-input').fill('12312'); // entering a password
  await page.getByTestId('password-input').blur(); // deselecting the focus from a particular field/window
  ```

- removal of redundant actions that do not affect the performance of the test

  ```javascript
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('12312');
  ```

  The `fill()` method implements both focus on the element and filling it with data. Therefore, the above code can be reduced to:

  ```javascript
  await page.getByTestId('password-input').fill('12312');
  ```

- if there are problems with the stability and performance of the tests, pay attention to whether the test action attempts to execute on a page that has not yet fully loaded. The solution is to add intelligent waiting in the form of a:
  ```javascript
  await page.waitForLoadState('domcontentloaded');
  ```

## lokatory

`Lokator`: is how we find a particular element from a web page.

`Selektor`: is the address of the element.

- The `getByTestId()` locator acts on the value of the attribute located in the code of the data-testid page.

  Example of an element with data-testid for entering a login:

  ```html
  <input
    type="text"
    css="login-input"
    name="login"
    id="login_id"
    data-testid="login-input"
    class="login-input"
    maxlength="8"
    autocomplete="off"
    tabindex="1"
  />
  ```

  Such a test id must be added by the developers of the application to the code of the respective page. Most often, this attribute is removed before deploying the application to production. Ultimately, adding and removing such an attribute is a technical convention dependent on the realities of the specific project.

  In Playwright, the default recognized format of the name is `data-testId`, but it can be named arbitrarily in the application code and set in `playwright.config.ts` (key `testIdAttribute`):

  For more information about what a test id is, you can read the following articles:

  Official documentation: https://playwright.dev/docs/locators#locate-by-test-id

  Why it is good to use test id: https://medium.com/@automationTest/why-your-development-team-should-use-data-testid-attributes-a83f1ca27ebb

  Implementation of an automatic test id in React: https://www.educative.io/answers/what-is-the-data-testid-attribute-in-testing

- The `getByRole()` locator works on the basis of element types and their characteristics.

  An example of an element associated with an execute button:

  ```html
  <button
    type="submit"
    class="btn red arrow"
    id="execute_btn"
    onclick="invokeQuickTransfer()"
  >
    wykonaj
  </button>
  ```

  The selector for this element acting on the button element type and its text value will be:

  ```javascript
  await page.getByRole('button', { name: 'wykonaj' }).click();
  ```

- The `locator()` uses, among other things, addresses written in CSS format.

  An example of an element with CSS related to the selection of a transfer recipient:

  ```html
  <select
    data-classes="selector-mt-small selector-ms-small transfer_receiver"
    onchange="changeValues();"
    id="widget_1_transfer_receiver"
  ></select>
  ```

  The selector for this element acting on the value of the id attribute will be:

  ```
  #widget_1_transfer_receiver
  ```

**TIP:** (Playwright codegen) During recording, locators are generated based on the reliability priority contained in the algorithms of this framework. Therefore, we receive different types of locators in recorded tests.

---

---

## Selektory

We can locate elements on a page using selectors:

- XPath
- CSS

Both XPath and CSS selectors are expressions with specific structure and writing rules.

**XPath selectors** (XML Path) originated as a query language for XML format. Since HTML is also a markup language, XPath selectors can be used for HTML.

**CSS selectors** are part of the CSS ecosystem - designed for finding elements and applying styles to them.

### Advantages and disadvantages of XPath and CSS selectors

**XPath Advantages:**

- Ability to navigate up and down the tag tree (can refer to the parent).
- Many built-in functions (e.g., `count()` or `text()`).
- Easy searching for elements by text fragment.
- Ability to retrieve attribute values (e.g., `//*[@id="id_elementu"]/@attribute`).

**XPath Disadvantages:**

- High entry threshold.
- Slightly slower than CSS selectors.
- Complex syntax.

**CSS selectors Advantages:**

- Relatively simple syntax, leading to faster learning.
- Well-known among front-end developers.
- Faster than XPath selectors.

**CSS selectors Disadvantages:**

- Have fewer capabilities than XPath selectors - lack certain functions or the ability to navigate up the tree.

```
TIP: Both types of selectors have their pros and cons, and there is no single leading type of selectors that should always be used. From experience, I can say that CSS selectors are more popular, but XPath is also used in many projects.
```

### Several basic CSS selectors:

- Expression for selecting elements by class name:
  ```
  .class_name
  ```
- Expression for selecting elements by ID (i.e., by the ID attribute):
  ```
  #id_element
  ```
- Expression for selecting elements by attribute value:
  ```
  [attribute="value"]
  ```

### Several basic XPath selectors:

- Expression for selecting elements by class name:
  ```
  //*[@class="class_name"]
  ```
- Expression for selecting elements by ID (i.e., by the ID attribute):
  ```
  //*[@id="id_element"]
  ```
- Expression for selecting elements by attribute value:
  ```
  //*[@attribute="value"]
  ```

---

**TIP:** The ability to automatically generate selectors through developer tools is a useful feature. However, it's important to remember that sometimes the generated selectors may not be optimal, for example:

```
body > section > div > div > div > div
```

This selector depends on many elements, and changing any of them could negatively impact the result - the desired element may not be found, or the wrong element may be found.

In such cases, knowledge of selectors comes in handy to try to optimize the above selector to its optimal form, taking into account its attributes, for example:

```
.login-container
```

### Testing Selectors in the DevTools console

- To test a CSS selector in the browser console, use the following syntax:

  ```javascript
  $$('CSS_selector');
  ```

  For example:

  ```js
  $$('.class_name');
  ```

- To test an XPath selector in the browser console, use the following syntax:

  ```js
  $x('XPath_selector');
  ```

  For example:

  ```js
  $x('//*[@class="class_name"]');
  ```

### Links:

XPath cheat sheet (lang: Polish) - https://jaktestowac.pl/xpath-szybka-sciaga/  
Free Course with 50 Practice Tasks for Reinforcing Knowledge of XPath Selectors (Polish) - https://jaktestowac.pl/course/xpath-zadania/

## Other

### Prettier

- install Prettier  
  `npm install --save-dev --save-exact prettier`
- configure Prettier

  - exlude files in `.prettierignore`

    ```
    package-lock.json
    playwright-report
    test-results

    ```

  - set rules in `.prettierrc.json`
    ```json
    {
      "singleQuote": true,
      "endOfLine": "auto"
    }
    ```

- run Prettier  
  `npx prettier --write .`
- additionaly you can install VSC extension: **Prettier**
  - and set default VSC formatter as Prettier (right mouse button and `Format document with ...`)

### Scripts in package.json

Scripts in the package.json file are used to define and invoke various commands and operations related to the project. The scripts section allows you to write custom commands and operations that are specific to a given project. This enables configuring short aliases instead of typing long commands in the console, making it easier to perform frequently used tasks.

For example, we can write scripts for:

- Running tests
- Running specific parts or specific tests
- Formatting our code
- Running applications
- And many other project-dependent tasks 🙂

---

- single command:  
  `"test": "npx playwright test",`
- command with parameters:  
  `"test:headed": "npx playwright test --headed",`
- other script with added parameters:  
  `"test:pulpit:hd" : "npm run test tests/pulpit.spec.ts -- --headed"`

Scripts can be run in standard and debug mode by:

- hovering over script name and using opition **Run**
- entering command `npm run script_name` i.e. `npm run test`
- using `NPM Scripts` tab in **Explorer** view (need to be enabled in **EXPLORER** settings)

## AAA Pattern: Arrange Act Assert

The AAA pattern, which stands for Arrange, Act, and Assert, is a common structure used in unit testing to organize test code. It helps in creating clear, readable, and maintainable tests by separating different parts of the testing process.

- **Arrange**: In this phase, you set up the preconditions or the initial state necessary for the test. This involves creating objects, initializing variables, or preparing the environment for the test.

- **Act**: This is the step where you perform the action or the operation that you want to test. It involves invoking the method or function under test with the arranged parameters or inputs.

- **Assert**: In the final phase, you verify that the action taken in the Act phase has resulted in the expected outcomes. This involves making assertions about the state of the system, the returned values, or any side effects caused by the action.

By following the AAA pattern, tests become more organized and easier to understand, as each phase serves a distinct purpose and contributes to the clarity and readability of the test code.

## DRY Principle (Don't Repeat Yourself)

The DRY principle is a programming principle that advises against repeating the same code in different parts of a program.

Instead of duplicating code, repetitive parts can be extracted and placed in a single location (file, function, method, etc.). This practice often facilitates understanding of the code, makes it easier to make changes, and reduces the risk of errors.

By doing so, we can save time and effort since we don't have to write the same code multiple times 😉

## beforeEach Hook

`beforeEach()` is a hook function called before each test. It exists in many testing libraries in JavaScript/TypeScript.

`beforeEach()` is used to perform certain actions before tests, such as data preparation, logging, environment setup, etc. This helps us avoid duplicating code in every test function.

## POM

### Page Object Model (POM)

The Page Object Model (POM) is a design pattern used in test automation. The pattern focuses on separating the logic responsible for interacting with web pages into separate modules, which are then used in tests.

POM is based on representing the structure of the tested web page in the form of classes/objects. Such an object then contains methods that represent the actions a user can perform on the page.

The Page Object Model helps to separate test logic from implementation details. Thus, when the application undergoes changes, such as a change in the structure of elements on the page, there is no need to modify the test code, only the appropriate Page Object objects.

By using the Page Object Model, automated tests can be written easily and clearly, making them more resistant to changes in the application and easier to maintain.

### Links

Official documentation - https://playwright.dev/docs/pom  
Martin Fowler article - https://martinfowler.com/bliki/PageObject.html

## Simple Page Object Model

Simple implementation of Page Object Model can be based on _classes_ that represents and implements tested pages.
Those calsses contains _locators_ of elements, that are used in tests, e.g. buttons, inputs etc.

Directory structure:

```java
+-- Projects
|   +-- pages
|       +-- login.page.ts
|       +-- ...
|   +-- tests
|       +-- login.spac.ts
|       +-- ...
```

### Page implementation

Simple implementation of login page in `./pages/login.page.ts`:

```javascript
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.getByTestId('login-input');
  passwordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');

  async login(userId: string, userPassword:string): Promise<void> {
    await this.loginInput.fill(userId)
    await this.passwordInput.fill(userPassword)
    await this.loginButton.click()
  }
}

```

#### Usage in tests

First import of selected page:

```javascript
import { LoginPage } from '../pages/login.page';
```

Then use page in tests:

```javascript
// Act
const loginPage = new LoginPage(page);
await loginPage.login(userId, userPassword);
```
