# System Architecture
*??? - ??? is taken directly from this website and needs to be updated: https://architecture.md/*

## 1. Project Structure
*??? this needs to be updated as we add build the project*

[Project Root]/
├── FlouraBackend/             
│   ├── Floura-Api/             
│   │   ├── api/          # API endpoints and controllers
│   │   ├── client/       # Business logic and service implementations
│   │   ├── models/       # Database models/schemas
│   │   └── utils/        # Backend utility functions
│   ├── config/           # Backend configuration files
│
├── Tests/             
│   ├── Floura.Tests/             
│   │   ├── Controllers/         
│   │   ├── Models/      
│   │   ├── Repositories/   
│   │   └── Services/        
│   
|
├── docs/                 # Project documentation (e.g., API docs, setup guides)
|	├── architecture.md            
│   └── backend-ci.md 
|
├── .github/              # GitHub Actions or other CI/CD configurations
|	├── workflows/        
│       ├── backend-ci.yml          
│  
├── .gitignore            # Specifies intentionally untracked files to ignore
├── README.md             # Project overview and quick start guide



## 2. Overview
The system uses React Native as frontend, ASP.NET Core as Backend and
MySQL (simply.com) as database. 
The communication between frontend and backend happens via REST-endpoints

## 3. Core components
- Floura.Api – Handles HTTP requests
- Floura.Core – Domain logic, services, models
- Repositories – Handles data access
- Database – Persistent storage


## 4. Layers
- Presentation layer (API)
- Application layer (services)
- Domain layer (models, rules)
- Infrastructure layer (repositories, database)

## 5. Data Flow
*Diagram over dataflow*
*To be added*

## 6. Dependencies between components
- Controllers → Services
- Services → Repositories
- Repositories → Database

## 7. API Layer
*To be added*

## 8. Database Architecture
*To be added**

## 9. Development & Testing Environment
- Local Setup Instructions: [
docs/backend-ci.md
README.md ]

- Testing Frameworks: [xUnit]
- Code Quality Tools: [ESLint + prettier]

## 10. Deployment & Infrastructure
- Cloud Provider: [Azure]
- CI/CD Pipeline: [GitHub Actions]

- ??? Key Services Used: [e.g., EC2, Lambda, S3, RDS, Kubernetes, Cloud Functions, App Engine] ???
- ??? Monitoring & Logging: [e.g., Prometheus, Grafana, CloudWatch, Stackdriver, ELK Stack] ???


## 11. How to update this document
- Update Component Overview if modules are added
- Update Data Flow if services are added.
- Update API Layer if any new endpoints are made.


## 12. Project Identification
- Project Name: [Floura-app-repo]
- Repository URL: [https://github.com/NEMOrganization/floura-app-repo]
- Primary Contact/Team: [NEM Organization]
- Date of Last Update: [2025-11-26]

