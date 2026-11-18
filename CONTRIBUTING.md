# Contributing to HOD Ads

Thanks for your interest! 🎉

## Workflow

> [!IMPORTANT]
> Please **open a pull request** — don't push directly to `main`.

1. Fork the repo and create a branch: `git checkout -b feat/my-feature`
2. Make your changes, then check that the project is formatted and still builds:
   ```sh
   npm install
   npm run format
   npm run build
   npm run dev   # check the poster preview and the PNG / JPG / PDF exports
   ```
3. Commit following the convention below.
4. Open a pull request describing **what** you changed and **why**, with a screenshot if the poster or the editor looks different.

## Code style

- Formatting is handled by [Prettier](https://prettier.io): run `npm run format` before committing (`npm run format:check` only checks).
- The code has no comments: prefer clear names and small functions over explanations.
- Where things live:

  | Path                    | Content                                            |
  | ----------------------- | -------------------------------------------------- |
  | `src/components/`       | editor UI (pole shelf, preview stage, form)        |
  | `src/poster/`           | the two poster styles and their shared helpers     |
  | `src/data/`             | poles, export formats, partner loading             |
  | `src/lib/`              | form state, export, colours, QR codes, Discord     |
  | `src/partners/<id>/`    | one folder per partner association                 |
  | `src/config/discord.ts` | Discord invite link of each association            |

- To add a partner association, follow the steps in the [README](README.md#ajouter-une-asso-partenaire).

## Commit convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <short description>
```

| Type       | Use for                                  |
| ---------- | ---------------------------------------- |
| `feat`     | a new feature                            |
| `fix`      | a bug fix                                |
| `docs`     | documentation only                       |
| `style`    | formatting, no code change               |
| `refactor` | code change that is neither fix nor feat |
| `perf`     | performance improvement                  |
| `test`     | adding or fixing tests                   |
| `chore`    | tooling, dependencies, config            |

Examples:

```
feat(partners): add the Loop association
fix(export): keep fonts in the PDF export
docs(readme): update screenshots
```

## Reporting a bug

Open an issue with steps to reproduce, what you expected and what happened. For a poster bug, include the pole, style, edition and format you picked.
