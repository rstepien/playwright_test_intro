# BASICS OF PLAYWRIGHT FRAMEWORK

## Czym jest PLAYWRIGHT?

Narzędzie do testów automatycznych e2e  
Dostępny w różnych językach:

- TypeScript
- JavaScript
- Python
- .NET
- Java  
  Pozwala na testowanie front-endu i back-endu

## W jakich postaciach występuję Playwright

- Playwright Test (`@playwright/test`) wzbogacony o Test Runner (narzędzie do uruchamiania testów)
- Biblioteka do interakcji z
  przeglądarką (Playwright Library)
- Niskopoziomowe API (`playwright-core`) dla klientów (np. bibliotek)

## Co oferuje Test Runner z Playwright Test?

#### Test Runner dostępny jest tylko w JavaScript/TypeScript

- Prosta konfiguracja testów
- Łatwe zrównoleglenie testów (pozwala na automatyczny podział zestawu testów na mniejsze podzbiory, każdy z nich można uruchomić w osobnym procesie(worker))
- Visual testing (czyli porównywanie wyglądy strony)
- Własne asercje
- Testy zależne i projekty zależne
- Raporty (html, json, line, własne)
- Wtyczka do VS Code (uruchamianie testów z IDE, nagrywanie testów, debug testów)
- UI mode (Łatwe zarządzanie, uruchamianie, analizowanie i debugowanie testów)

#### Dodatkowe zalety Playwright Test:

- Rozszerzalna konfiguracja (może być dziedziczona) masą ustawień
- Projekty (z zależnościami, sesją, urządzeniami i zakresami testów)
- Screenshots, video, trace, adnotacje, tagi
- Zrównoleglenie i powtarzanie testów zakończonych niepowodzeniem
- Ustawienia globalne, przed testami, suite, czy testem
- Timeouts globalne, testów, akcji, asercji, fixture, nawigacji
- Automatyczne uruchamianie i ustawianie aplikacji do testów

## Playwright Test w innych językach niż JavaScript/TypeScript?

- W najbliższym czasie nie będzie Playwright Test dla innych języków
- Są narzędzia, które oferują podobne funkcjonalności (np. zrównoleglania
  testów) - wymagają implementacji i utrzymania
- Około 70-80% pobrań Playwright to wersja TS/JS - oznacza to znacząco
  mniejsze zainteresowanie w innych językach (\* brak statystyk dla JAVA)

## Co jeśli chcemy używać samego Playwright w innych językach np. Python, .Net, Java?

Wtedy możemy skonfigurować zewnętrzne narzędzia.

- Przykłady Test runners: pytest, MSTest, NUnit, TestNG
- Przykłady Reporters: Allure, reportportal

### Nie wszystkie funkcje występujące w Playwright Test są dostępne w tych zewnętrznych narzędziach.

Jakich nie ma:

- testy sekwencyjne, steps
- soft asercje
- raporty z trace, wideo i screenshot
- globalne konfiguracje timeout

## Ograniczenia Playwright

- Brak wsparcia dla starszych wersji przeglądarek
- Brak natywnego wsparcia dla BDD
- Brak wsparcia dla urządzeń mobilnych – Real Devices – tylko Android eksperymentalnie
- All-in-one – dużo opcji i możliwości może też być wadą, gdyż możemy nie mieć potrzeby wykorzystywać jego wszystkie funkcje
- Styl pisania testów bazujący na JavaScript i TypeScript – potrzeba używania async/await lub then i brak możliwości wykorzystania method chaining (jak w Cypressie)

# Dobre praktyki

### Jak przyspieszyć wykonanie testów

- Podziel pliki testowe i wykorzystaj projekty, aby efektywnie korzystać z workerów
- Jeśli to możliwe, użyj trybu `parallel` lub przejdź do trybu `fullyParallel`
- Wykorzystaj interfejs API (wysyłanie żądań, modyfikowanie/mockowanie request-ów)
- Wprowadź sharding do pipeline-ów CI/CD

# Knowledge summary - Test Automation training from jaktestowac.pl

## Links

- course https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site https://demo-bank.vercel.app/  
  if link is broken check https://jaktestowac.pl/lesson/pw1s01l01/

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

### Updating Playwright

- check if Playwright should be updated  
  `npm outdated @playwright/test`
- update Playwright  
  `npm i @playwright/test`
- update browsers  
  `npx playwright install`
- verify Playwright version  
  `npx @playwright/test --version`

## Playwright Config modifications

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

## Visual Studio Code

### Functions

- Preview: for README.md
- Autosave: in File -> Auto Save
- Timeline: file context menu -> Open Timeline
- Formatting: editor -> context menu -> Format Document
- Searching: editor -> <kbd>CTRL</kbd> + <kbd>F</kbd>
- Accept hint in editor: <kbd>Enter</kbd>
- Comment/Uncomment: <kbd>Ctrl</kbd> + <kbd>/</kbd>
- Duplicate line: <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>↑</kbd>
- Use more than one terminal: <kbd>+</kbd> button in TERMINAL
- Extract to variable: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd>
- Move line i.e. up: <kbd>Alt</kbd> + <kbd>↑</kbd>
- Creating a new variable: Refactor <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> -> Extract to constant in enclosing scope

### Plugins

- GitLens - view details of your repository i.e. commits history

## Playwright snippets & tips

- test:
  ```javascript
  test('test description', async ({ page }) => {});
  ```
- describe: grupownie testów w logiczną całość za pomocą `test.describe` pomaga poprawić czytelność testów z tego samego obszaru:
  ```javascript
   describe('Group description', () => {
      test 1
      test 2
      test 3
   });
  ```
- running one test: `test.only`  
  Jeśli pracujesz nad nowym testem i nie chcesz uruchamiać pełenj suity dodat `test.only` przy danym teście, przy egzekucji zostaną odpalone tylko te testy np. `test.only('login test', async ({ page }) => {});`  
   `     TIP: Pamiętaj o usunięciu tej opcji po testach danego testu 😀
  `
- jeśli zależy Ci na zgubieniu focus-u z danego elementu, użyj funkcji `blur()` przykład:

  ```javascript
  await page.getByTestId('password-input').click(); // ustawienie focus-u na oknie wpisywania hasła
  await page.getByTestId('password-input').fill('12312'); // wpisanie hasła
  await page.getByTestId('password-input').blur(); // odznaczenie focus-u z danego pola/okna
  ```

- usuwanie nadmiarowych akcji, które nie wpływają na wykonanie testu

  ```javascript
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('12312');
  ```

  Metoda `fill()` realizuje zarówno focus na elemencie jak i wypełnienie go danymi. Dlatego powyższy kod może zostać zredukowany do:

  ```javascript
  await page.getByTestId('password-input').fill('12312');
  ```

- jeśli zdarzają się problemy ze stabilnością i działaniem testów, zwróć uwagę czy próby wykonania akcji testowej nie wykonywały się na jeszcze nie do końca załadowanej stronie. Rozwiązaniem jest dodanie inteligentnego czekania w postaci:
  ```javascript
  await page.waitForLoadState('domcontentloaded');
  ```

### lokatory

`Lokator`: jest to sposób w jaki znajdujemy dany element ze strony internetowej.

`Selektor`: jest to adres danego elementu

- Lokator `getByTestId()` działa w oparciu o wartość atrybutu zlokalizowanego w kodzie strony data-testid.

  Przykład elementu z data-testid do wpisywania loginu

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

  Taki test id musi zostać dodany przez twórców aplikacji do kodu danej strony. Najczęściej ten atrybut jest usuwany przed wprowadzeniem aplikacji na produkcję. Ostatecznie dodawanie i usuwanie takiego atrybutu to konwencja techniczna zależna od realiów danego projektu.

  W Playwright domyślnie rozpoznawany jest format nazwy `data-testId` ale można go dowolnie nazwać w kodzie aplikacji i ustawić w `playwright.config.ts` (klucz `testIdAttribute`):

  Więcej o tym czym jest test id poczytasz we wpisach (język angielski):

  Oficjalna dokumentacja: https://playwright.dev/docs/locators#locate-by-test-id

  Dlaczego warto używać test id: https://medium.com/@automationTest/why-your-development-team-should-use-data-testid-attributes-a83f1ca27ebb

  Implementacja automatycznego test id w React: https://www.educative.io/answers/what-is-the-data-testid-attribute-in-testing

- Lokator `getByRole()` działa w oparciu o typy elementów i ich cechy.

  Przykład elementu związanego z przyciskiem wykonaj:

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

  Selektorem dla tego elementu działającym w oparciu o typ element button i wartość jego tekstu będzie:

  ```javascript
  await page.getByRole('button', { name: 'wykonaj' }).click();
  ```

- Lokator `locator()` wykorzystuje między innymi adresy zapisane w formacie CSS.

  Przykład elementu z css związanego z wybieraniem odbiorcy przelewu:

  ```html
  <select
    data-classes="selector-mt-small selector-ms-small transfer_receiver"
    onchange="changeValues();"
    id="widget_1_transfer_receiver"
  ></select>
  ```

  Selektorem dla tego elementu działającym w oparciu o wartość atrybutu id będzie:

  ```
  #widget_1_transfer_receiver
  ```

  ***

  ```
  TIP: (Playwright codegen) podczas nagrywania stosowane są lokatory według priorytetu niezawodności zawartym w algorytmach tego frameworka. Dlatego otrzymujemy różne typy lokatorów w nagrywanych testach.
  ```

  ***
