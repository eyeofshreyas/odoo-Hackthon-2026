# Contributing to TransitOps

First of all, thank you for your interest in contributing to **TransitOps**! Every contribution, whether it's fixing a bug, improving documentation, or adding a new feature, helps make this project better.

TransitOps was developed as part of the **Odoo Hackathon 2026**, and we welcome constructive contributions and suggestions from the community.

---

## Where do I start?

Before making any changes, please check the existing **Issues** to see if the problem or feature request has already been reported.

If you don't find an existing issue, feel free to create one with a clear description of:

- The problem you found
- Steps to reproduce (if it's a bug)
- Expected behavior
- Screenshots (if applicable)
- Suggested improvements (for feature requests)

---

## Fork the Repository & Create a Branch

Start by forking the repository and creating a new branch for your work.

Use a descriptive branch name, for example:

```bash
feature/vehicle-dashboard
bugfix/login-validation
docs/update-readme
```

---

## Set Up the Project

Clone your fork and install the required dependencies.

### Clone the repository

```bash
git clone https://github.com/eyeofshreyas/odoo-Hackthon-2026.git
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

---

## Make Your Changes

You're now ready to start contributing.

Please ensure that:

- Code is clean and readable.
- Existing project structure is followed.
- Components are reusable whenever possible.
- Variable and function names are meaningful.
- Unused code is removed before committing.

If you modify the user interface, please update the **Frontend Specification Document (FSD.md)** if necessary.

---

## Test Your Changes

Before submitting your work:

- Verify the application runs without errors.
- Check that your changes do not break existing functionality.
- Test both frontend and backend if your changes affect both.

---

## Commit Your Changes

Write clear and meaningful commit messages.

Examples:

```bash
git commit -m "feat: add vehicle management module"
```

```bash
git commit -m "fix: resolve login validation issue"
```

```bash
git commit -m "docs: update README documentation"
```

---

## Submit a Pull Request

Before opening a Pull Request:

- Pull the latest changes from the main branch.
- Resolve any merge conflicts.
- Push your branch to GitHub.
- Create a Pull Request with a clear description of your changes.

Your Pull Request should include:

- Summary of the changes
- Related issue (if applicable)
- Screenshots (for UI changes)
- Testing performed

---

## Coding Guidelines

Please follow these general guidelines:

- Write modular and reusable code.
- Follow consistent naming conventions.
- Keep components small and focused.
- Use meaningful comments only where necessary.
- Follow the existing folder structure.
- Maintain consistent formatting throughout the project.

---

## Documentation

If your contribution affects project functionality, please update the relevant documentation, including:

- README.md
- FSD.md
- API Documentation (if applicable)

---

## Code of Conduct

By participating in this project, you agree to follow our **Code of Conduct** and help maintain a welcoming, respectful, and collaborative environment for everyone.

---

## Project Team

TransitOps was developed by:

- **Shresh Shende**
- **Tejaswini Prakash**
- **Aishwarya Shirgavi**
- **Shreya Pandey**

for the **Odoo Hackathon 2026**.

Thank you for contributing to TransitOps! 🚛