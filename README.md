# GitHub Actions CI/CD Project
## Knowledge Transfer (KT) Document

| Item | Details |
|---|---|
| Project | Sandeep CICD Project |
| GitHub repository | `Sandeep-Jagan/Sandeep-CICD-Project` |
| GitHub branch | `main` |
| AWS account | `767260371307` |
| AWS Region | `us-east-1` |
| IAM deployment role | `GitHubActions-Sandeep-S3-Deploy` |
| IAM policy | `GitHubActions-Sandeep-S3-Policy` |
| Deployment target | Amazon S3 |
| Authentication | GitHub OIDC and AWS IAM role assumption |
| CodeCommit repository | `Sandeep-cicd-task-repo` |
| Document version | 1.1 |
| Last updated | October 2026 |
| Current status | GitHub Actions tests/build, OIDC authentication, and S3 deployment succeeded; CodeCommit repository and SSH setup documented below. |

---

## 1. Project Overview

This project demonstrates a basic continuous integration and continuous deployment (CI/CD) pipeline using Git, GitHub, GitHub Actions, AWS IAM, GitHub OpenID Connect (OIDC), Amazon S3, and AWS CodeCommit.

The application is a static website developed using HTML, CSS, and JavaScript. A push to the `main` branch triggers GitHub Actions. The workflow validates the project files, runs tests, prepares a build directory, obtains temporary AWS credentials using OIDC, and synchronizes the built website to Amazon S3.

### High-level architecture

```text
Developer changes code
        ↓
Commit and push to GitHub (main)
        ↓
GitHub Actions workflow
        ↓
Validate files → Run tests → Build to dist/
        ↓
GitHub OIDC token
        ↓
AWS IAM trust policy → Assume deployment role
        ↓
Temporary AWS credentials
        ↓
Sync dist/ to Amazon S3
        ↓
Deployed static website
```

The objective is to demonstrate an automated deployment triggered by a source-code change while avoiding long-lived AWS access keys stored in GitHub.

## 2. Project Objectives

- Manage source code using Git and GitHub.
- Develop a simple static application.
- Create an automated CI/CD workflow using GitHub Actions.
- Validate files and run application tests automatically.
- Build the deployable website files.
- Deploy the website to Amazon S3.
- Configure secure GitHub-to-AWS authentication using OIDC.
- Limit AWS permissions using IAM and the principle of least privilege.
- Maintain a copy of the project in AWS CodeCommit.
- Document the setup, workflow, troubleshooting, and operational steps.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| HTML | Web page structure and content |
| CSS | Website layout, styling, and responsive presentation |
| JavaScript | Client-side functionality, including the current year in the footer |
| Git | Source-code version control |
| GitHub | Main source-code repository |
| GitHub Actions | CI/CD automation |
| GitHub OIDC | Federated identity for AWS authentication |
| AWS IAM | Role trust and permissions management |
| AWS STS | Issues temporary credentials when the role is assumed |
| Amazon S3 | Deployment destination for the built static website |
| AWS CodeCommit | Additional AWS-hosted source-code repository |
| VS Code | Development environment |

