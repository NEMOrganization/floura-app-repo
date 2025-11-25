# Floura App 

This repository contains the Floura application, including the backend, tests and workflows for CI/CD.

## Project Structure 

- **FlouraBackend/** - C# backend solution 
	- `Floura.Api/` – ASP.NET Core Web API (controllers, Swagger, DI, CORS)
	- `Floura.Core/` - Core logic
	- `FlouraBackend.sln` - Solution file
- **Tests/Floura.Tests/** - XUnit test project
- **.github/workflows/** - GitHub Actions workflows

## Getting Started 

### Using terminal
```bash 
git clone <repo-url>
cd floura-app-repo
dotnet restore FlouraBackend/FlouraBackend.sln
dotnet build FlouraBackend/FlouraBackend.sln
dotnet test Tests/Floura.Tests/
```

### Using GitHub UI 
1. Select "Open with GitHub Desktop" and clone the repository. 
2. Open FlouraBackend.sln in Visual Studio or your preferred IDE. 
3. Restore dependencies and build the solution. 

## Backend CI / Workflow 

The backend CI workflow is implemented using GitHub Actions to ensure code builds and tests pass before merging into `main`.

- **Automatic triggers**:
	- Push to `main` or developer branches 
	- Pull requests to `main`
- **Manual runs**: Use the **Actions --> Run workflow** button to trigger manually. 
- **Branch protection**: PRs cannot be merged into `main` unless the workflow passes and required approvals are given. 

For detailed instructions, see [docs/backend-ci.md](docs/backend-ci.md).

## Contribution Guidelines 

- Use feature branches based off `developer`.
- Open pull requests to `main` once your feature or fix is ready. 
- PRs require at least 1 review approval and passing backend CI workflow. 
- Resolve all conversations before merging. 

## Architecture Overview 

*To be added.*

## Database / Storage 

*To be added.*

## Envronment Variables / Configuration 

*To be added.*

## Testing Guidelines 

# Floura.Tests

## How to run tests
- Open Test Explorer in Visual Studio
- Click “Run All Tests”
- Or use the CLI: dotnet test

## Structure
Tests are organized by layer:
- Models/
- Controllers/
- Repositories/
- Services/

## Naming conventions
- Class under test: Story
- Test class: StoryTests.cs
- Test method name: MethodName_Should_DoSomething()


## Known Issues / TODOs

*To be added.*

## References / External Docs 

*To be added.*

