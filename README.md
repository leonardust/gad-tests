# Tests for GAD application

## GAD Application

Repository: https://github.com/jaktestowac/gad-gui-api-demo

Follow instructions in app README

## Prepare

### Local recommended tools:

- VS Code
- Git
- Node.js (version >16)

### Installation and setup

- (optional) install VSC recommended plugins
- install dependencies: `npm install`
- setup Playwright with: `npx playwright install --with-deps chromium`
- setup husky with: `npx husky install`
- prepare local env file `cp .env.template .env`
- copy application main URL as value of `BASE_URL` variable in `.env` file

## Use

Run all tests:

```
npx playwright test
```

Run all test with tags:

```
npx playwright test --grep "@GAD-R01-02"
```

Run all test without tags:

```
npx playwright test --grep-invert "@GAD-R01-02"
```

Run tests with tags containing “@GAD-R01-01” lub “@GAD-R01-02”:

```
npx playwright test --grep "@GAD-R01-01|@GAD-R01-02"
```

Run test containing multiple tags

```
npx playwright test --grep "(?=._@fast)(?=._@slow)"
```

Run the same test many times

```
npx playwright test --grep "@GAD-R03-01" --repeat-each=5
```

Windows

Run tests with tags containing “@GAD-R01-01” lub “@GAD-R01-02”

CMD

```
npx playwright test --grep "@GAD-R01-01^|@GAD-R01-02"
```

PowerShell

```
npx playwright test --grep --% "@GAD-R01-01^|@GAD-R01-02"
```

## Environment Variables

Setting environment variable  
Bash:

```bash
export BASE_URL='http://localhost:3000/'
```

playwright.config.ts

```typescript
baseURL: process.env.BASE_URL,
```

For more usage cases look in `package.json` scripts section.

```

```

```

```
