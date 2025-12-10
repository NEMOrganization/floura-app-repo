# Frontend CI Workflow

This document describes the frontend CI workflow for the Floura project.

## Workflow File Location

- `.github/workflows/frontend-ci.yml`

## Workflow Triggers

- **Automatic**:
  - `push` to `main` branch
  - `pull_request` to `main` branch, only for paths under `FlouraFrontend/FlouraMobileApp/**`
- **Manual**:
  - Manual runs are not configured, but can be triggered via GitHub Actions tab if desired.

## Workflow Steps

1. **Checkout Code**  
   Pulls the latest code from the branch.

2. **Setup Node.js**  
   Installs Node.js v20.

3. **Install Dependencies**  
   Runs `npm install` in `FlouraFrontend/FlouraMobileApp` to install project dependencies.

4. **Run ESLint**  
   Runs `npm run lint` to check code quality and formatting.  
   - The pipeline fails if any lint errors are found.
   - Warnings do not fail the build, but are visible in the workflow output.

## Branch Protection

- `main` branch is protected with rules:
  - PR required before merging
  - CI workflow must pass (lint step)
  - Required approvals (from at least 1 other developer)
  - Dismiss stale approvals on new commits
  - Require conversation resolution
  - Require branch to be up-to-date before merging

## Accessing Lint Results

- Lint output is visible directly in GitHub Actions logs under the `Run ESLint` step.

## Troubleshooting

- **Lint errors**: run `npm run lint` locally to see the same errors. Use `npm run lint:fix` to auto-fix fixable issues.  
- **Dependencies missing**: ensure `npm install` completed successfully and `package-lock.json` is up-to-date.  
- **Workflow fails unexpectedly**: check logs in GitHub Actions for the exact failing step.

## Jest
**To be added**: 

## React Native Testing Framework
- **Run Test**: 
npm test

- **Placement**:
FlouraFrontend/FlouraMobileApp/FrontendTests

-**Naming convention**:
"componentName".spec.tsx

test name: 'what the test does ... when ...'

- **Write Test**: 
Arrange, act and assert

describe('component name')
it (test name: 'test do ... when ...') 
expect('when you do this).'we expect this'()

- **Troubleshooting**:
If error message says 'Binding element 'fx. name' implicitly has an 'any' type --> You need to define an props interface. 

- **Usefull tools and tips**:
RNTL queries: 
   getByText("click me") - finds the text
   getByRole("button") - finds the element via role
   *getByA11yLabel("...") - finds the element via accessibilityLabel => we dont use this one, but getByRole instead
   getByTestId("...") - finds the element via testID-prop 

Simulats user action:
   fireEvent.press(element)
   fireEvent.changeText(input, "..the new text..")


