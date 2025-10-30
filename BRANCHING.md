# Branching Strategy

This document describes the Git branching workflow used by the Jos North CDS project. The goal is to make collaboration predictable, avoid long-lived feature branches that diverge from `main`, and ensure releases and hotfixes are traceable.

Branch types
- `main`
  - Protected production branch. Always contains releasable code.
  - Only merge via pull requests that have at least one approving review and passing CI.

- `develop`
  - Integration branch for completed features destined for the next release.
  - Developers create feature branches from `develop` and open PRs back into `develop`.

- `feature/*`
  - Short-lived branches for new features or tasks.
  - Naming: `feature/<short-description>` or `feat/<ticket-number>-short-desc`.
  - Branch off `develop`. When finished, open a PR to `develop` and squash/merge after review.

- `release/*`
  - Created from `develop` when preparing a release (example: `release/v0.1.0`).
  - Used to finalize version bumps, changelogs, and last-minute fixes.
  - When ready, merge into `main` and `develop` (merge to main creates a tagged release; merge back to develop keeps history).

- `hotfix/*`
  - Created from `main` to fix production issues quickly.
  - After fix, merge into `main` and `develop` (and `staging` if applicable).
  - Naming: `hotfix/<short-desc>` or `hotfix/v0.1.1`.

- `staging`
  - Optional pre-production branch where the integration build deployed to a staging environment.
  - Created from `develop` (or kept in sync) to run final QA before releasing.

Branching rules and PR process
- Branch from the correct base: feature branches from `develop`, hotfixes from `main`, releases from `develop`.
- Open a pull request with a clear title and description that references any related issue/ticket.
- Include a summary of changes, testing steps, and any migration notes in the PR description.
- Require at least one approving review before merging (2 recommended for larger changes).
- Ensure CI checks pass (lint, build, type-check, tests) before merging.
- Prefer fast-forward or squash merges for feature branches to keep history readable.

Naming conventions
- Feature: `feature/<short-desc>` or `feat/<issue>-<short-desc>`
- Bugfix: `fix/<short-desc>`
- Hotfix: `hotfix/<short-desc>`
- Release: `release/v<semver>`

Versioning and releases
- Use semantic versioning for releases (MAJOR.MINOR.PATCH).
- Create `release/*` branches to prepare a release, bump `package.json` version there, and merge to `main` to create a release tag.

Branch protection recommendations (apply on GitHub)
- Protect `main` and `develop`: require PR reviews, require status checks, disallow force pushes.
- Protect `release/*` pattern: require status checks and at least one review.

Workflow examples
- Feature work
  1. `git checkout develop`
  2. `git checkout -b feature/add-events-list`
  3. Implement, commit, push and open PR to `develop`.

- Release
  1. `git checkout develop`
  2. `git checkout -b release/v0.1.0`
  3. Finalize changelog/version, run QA, then open PR to `main`.
  4. Merge `release/v0.1.0` into `main` (create tag), then merge `main` back into `develop`.

- Hotfix
  1. `git checkout main`
  2. `git checkout -b hotfix/fix-navbar`
  3. Fix, push and open PR to `main`.
  4. Merge into `main`, then merge `main` into `develop`.

Tips
- Keep feature branches small and focused — shorter review cycles and less merge friction.
- Rebase locally to keep your branch up-to-date with the base branch if necessary, but avoid force-pushing to shared branches.
- Link PRs to issues and include screenshots or testing steps when applicable.

This branching model is flexible — if you prefer Git Flow, trunk-based, or another workflow we can adapt these rules. The primary goal is clarity and predictable releases.
