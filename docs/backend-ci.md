# Backend CI Workflow 

This document describes the backend CI workflow for the Floura project. 

## Workflow File Location 

- `.github/workflows/backend-ci.yml`

## Workflow Triggers 

- **Automatic**:
	- `push` to `main` or developer branches
	- `pull_request` to `main`
- **Manual**:
	- `workflow_dispatch` allows manually running the workflow from the GitHub Actions tab.

## Workflow Steps 

1. **Checkout Code** - Pulls the latest code from the branch. 
2. **Setup .NET SDK** - Installs the required .NET SDK version (8.0.x).
3. **Cache NuGet Packages & Build Outputs** - Speeds up build times. 
4. **Restore Dependencies** - Runs `dotnet restore` on the solution. 
5. **Build Solution** - Runs `dotnet build` without restoring packages. 
6. **Run Tests + Coverage** - Uses `dotnet test` with: 
	- xUnit tests
	- TRX test results: `Tests/Floura.Tests/TestResults/test_results.trx`
	- Coverage report (Coberture XML): `Test/Floura.Tests/TestResults/coverage.xml`
7. **Uploads Artifacts** - Test results and coverage reports are uploadet to GitHub Actions for download and review. 

## Branch Protection 

- `main` branch is protected with a ruleset:
	- PR required before merging 
	- CI workflow (`build-and-test`) must pass
	- Required approvals (from at least 1 other developer)
	- Dismiss stale approvals on new commits 
	- Require conversation resolution 
	- Require branch to be up-to-date before merging 

## Accessing Artifacts 

- Download test results and coverage from the **Actions --> build-and-test --> Artifacts** section. 
- Test results oath: `Tests/Floura.Tests/TestResults/test_results.trx`
- Coverage report path: `Tests/Floura.Tests/TestResults/coverage.xml`

## Troubleshooting 

- **Build fails**: check `.csproj` dependencies and restore NuGet packages. 
- **Tests fail**: investigate `Floura.Tests` project for failing tests. 
- **Missing packages**: verify that caching restored NuGet packages properly. 
- **Workflow fails**: check logs in GitHub Actions for the exact failing step. 
