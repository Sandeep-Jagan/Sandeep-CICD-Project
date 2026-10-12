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
cloudops-cicd-demo/
├── .github/workflows/deploy.yml
├── src/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── tests/test.sh
├── KT/GitHub-Actions-CICD-KT.md
├── .gitignore
└── README.md
```

The workflow copies the application files from `src/` into `dist/`; the `dist/` directory is the deployment artifact.

## 4. CI/CD Workflow

The workflow is defined in `.github/workflows/deploy.yml` and is configured to run on pushes to `main` and on manual dispatch (`workflow_dispatch`). Its main stages are:

- **Checkout:** retrieves the repository contents using `actions/checkout`.
- **File validation:** checks that the HTML, CSS, JavaScript, and test script exist.
- **Test:** runs `bash tests/test.sh`. The tests initially exposed a mismatch in the expected HTML title; the title expectation was corrected, after which the tests passed.
- **Build:** copies `src/` into `dist/` and verifies the built files exist.
- **Configuration validation:** checks that the required GitHub Actions variables are set.
- **AWS authentication:** uses `aws-actions/configure-aws-credentials` with OIDC to assume the IAM role.
- **Identity verification:** runs `aws sts get-caller-identity` to confirm which AWS identity the job is using.
- **Deploy:** runs `aws s3 sync dist/ "s3://${S3_BUCKET}/" --delete`.

### Workflow permissions

```yaml
permissions:
  contents: read
  id-token: write
```

`contents: read` allows the workflow to read repository contents. `id-token: write` allows the job to request a GitHub OIDC token for AWS role assumption.

### Important deployment note

The `--delete` option removes destination objects that are not present in the `dist/` build output. Use a dedicated bucket for this demo website; do not point this command at a bucket containing unrelated files.

## 5. AWS Configuration

**AWS account ID:** `767260371307`  
**Region:** `us-east-1`  
**IAM role:** `GitHubActions-Sandeep-S3-Deploy`  
**Role ARN:** `arn:aws:iam::767260371307:role/GitHubActions-Sandeep-S3-Deploy`  
**GitHub OIDC provider:** `arn:aws:iam::767260371307:oidc-provider/token.actions.githubusercontent.com`  
**CodeCommit repository created:** `Sandeep-cicd-task-repo` (region `us-east-1`)

### OIDC authentication

The GitHub OIDC provider uses the audience `sts.amazonaws.com`. The workflow requests an OIDC token, and AWS STS exchanges it for temporary credentials when the IAM role's trust policy permits the token's issuer, audience, and subject.

During troubleshooting, the workflow's diagnostic step displayed these non-secret claims:

- Issuer: `https://token.actions.githubusercontent.com`
- Audience: `sts.amazonaws.com`
- Subject observed in the run: `repo:Sandeep-Jagan@333763674/Sandeep-CICD-Project@1395410053:ref:refs/heads/main`

The trust policy was adjusted during troubleshooting, after which AWS authentication succeeded. Confirm the current IAM role trust policy in the AWS console before presenting or changing it. GitHub's subject format can depend on repository/organization configuration; do not replace a working trust policy with a guessed value.

### Least-privilege access

The IAM role should grant only the S3 permissions needed for the deployment bucket and its objects, plus any permissions required to list the bucket. Avoid broad administrator permissions. Never put AWS access keys or other credentials directly in source code or the workflow file.

## 6. GitHub Actions Variables

The workflow reads configuration from **GitHub repository → Settings → Secrets and variables → Actions → Variables**:

| Variable | Purpose |
|---|---|
| `AWS_ROLE_ARN` | ARN of the IAM role that GitHub Actions assumes |
| `AWS_REGION` | AWS deployment region (`us-east-1`) |
| `S3_BUCKET` | Name of the S3 bucket receiving the website build |

These values are configuration variables, not long-lived credentials. No AWS access key or secret access key is required for the OIDC-based workflow.

## 7. Deployment Issue and Resolution

During the first deployment attempt, the S3 sync command failed because the `S3_BUCKET` variable contained a trailing space. The error showed an invalid bucket name ending with a space. The variable was corrected to the exact bucket name, `githubactions-cicd-demo-sandeep`, and the deployment then succeeded.

Troubleshooting checklist for a similar error:

1. Check the `S3_BUCKET` variable for leading or trailing spaces.
2. Confirm the bucket exists and is in the intended region.
3. Confirm the IAM role has the required S3 permissions for that bucket.
4. Review the failing workflow step's error message and rerun after correcting the issue.

## 8. Current Progress

### Completed

- Created the GitHub repository and main-branch workflow.
- Added the static website source files and shell test script.
- Fixed the HTML title expectation so the automated tests pass.
- Configured the GitHub Actions variables for AWS role, region, and bucket.
- Configured GitHub OIDC and the AWS IAM role so the workflow can authenticate to AWS without stored AWS access keys.
- Confirmed AWS identity from the workflow.
- Corrected the trailing whitespace in the S3 bucket variable.
- Successfully ran the S3 deployment step.
