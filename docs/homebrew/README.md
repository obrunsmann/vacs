# Homebrew rollout artifacts

This folder contains ready-to-use artifacts to roll out official Homebrew installation for `vacs`.

## Included files

- `tap-template/Casks/vacs.rb`
  - Initial cask using latest known release metadata (copy to the tap repo).
- `.github/workflows/release-homebrew.yml` (in the main repository)
  - Main-repo release action that opens cask update PRs against the tap repo after `vacs-client` releases.

## How to apply

1. Create `vacs-project/homebrew-tap`.
2. Copy `tap-template/Casks/vacs.rb` to `Casks/vacs.rb` in that tap.
3. Ensure the GitHub App used by this repo has access to the tap repository.
4. Open RFC issue in `vacs-project/vacs` using `rfc-issue-template.md`.
5. Merge `.github/workflows/release-homebrew.yml` in `vacs-project/vacs`.
6. After tap is live, open a docs PR in `vacs-project/vacs` using `main-repo-pr-template.md`.
