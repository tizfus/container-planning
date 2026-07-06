# Agent Guidelines

## Project Overview

This project is a **plain JavaScript/HTML** single-page application for planning shipping container filling. No frameworks are used.

## Source Code (`/src`)

- All source code in `/src` is managed by the Agent.
- You have full freedom to write code as you see fit — the user will never edit these files directly.

## Tests (`/tests`)

- All test files live in the `/tests` folder.
- You can help define and develop tests, but the code will be **reviewed by the user**, so **readability is paramount**.
- Use clear naming, descriptive step definitions, and well-structured feature files.

## Running Tests

After any change, tests **must** be run and **all must pass**:

```bash
npm --prefix ./tests/ 
```

Do not consider a change complete until every test is green.

## Branching

- All new features **must** be developed on a branch **different than `main`**.
- Never commit feature work directly to `main`.
