# Knowledge Transfer (KT) Document: GitHub Actions CI/CD to AWS S3

**Project:** GitHub Actions CI/CD Demo  
**Prepared for:** Performance Evaluation / CI/CD Demonstration  
**Status:** GitHub Actions build, tests, AWS OIDC authentication, and S3 deployment have succeeded.

## 1. Project Objective

Build a simple static website and automate validation, testing, packaging, and deployment using GitHub Actions. The pipeline deploys the generated website to an Amazon S3 bucket. GitHub Actions obtains temporary AWS credentials through OpenID Connect (OIDC), avoiding long-lived AWS access keys in GitHub.

## 2. High-Level Architecture

1. Developer commits and pushes changes to the `main` branch in GitHub.
2. GitHub Actions checks out the repository.
3. The workflow verifies that required application and test files exist.
4. Automated shell tests run.
5. The workflow creates a `dist/` build directory from the contents of `src/`.
6. GitHub Actions requests an OIDC token and assumes a restricted AWS IAM role.
7. The workflow verifies the AWS identity and synchronizes `dist/` to the configured S3 bucket.
8. The deployed static website can be opened using the bucket's configured website endpoint, if static website hosting and public access are configured.

## 3. Repository and Project Structure

**GitHub repository:** `Sandeep-Jagan/Sandeep-CICD-Project`  
**Branch:** `main`

Expected project structure:

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

