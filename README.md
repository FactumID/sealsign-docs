# SealSign Documentation

This documentation site is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Requirements

- Node.js >= 20.0
- Yarn (recommended) or npm

## Installation

```bash
yarn install
```

## Local Development

```bash
yarn start
```

This command starts a local development server at `http://localhost:3000`. Most changes are reflected live without restarting the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory.

## Deployment to GitHub Pages

The site is deployed automatically via GitHub Actions when changes are pushed to the `main` branch. For manual deployment:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

This builds the website and pushes it to the `gh-pages` branch.

## Adding New Documentation

### 1. Create the markdown file

Add your new documentation file to the appropriate folder under `docs/`:

```
docs/
├── _navbar.md          # Navigation bar config
├── _sidebar.md         # Sidebar config
├── bss/
├── changelog/
├── ckc/
├── clickonce/
├── cloud/
├── dss/
├── license/
└── monitor/
```

Example file structure (`docs/dss/new-feature.md`):

```markdown
---
sidebar_position: 3
---

# New Feature

Description of your new feature...
```

### 2. Update the sidebar

Edit `sidebars.ts` to include your new document:

```typescript
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'On Premise',
      collapsed: false,
      items: [
        'license/license',
        'dss/new-feature',  // Add your new doc here
        // ...other items
      ],
    },
    // ...other categories
  ],
};
```

### 3. Add translations (optional)

To add a Spanish version, create the corresponding file in `i18n/es/docusaurus-plugin-content-docs/current/`:

```markdown
---
sidebar_position: 3
---

# Nueva Característica

Descripción de la nueva característica...
```

### Sidebar Position

Use `sidebar_position` in the frontmatter to control the order of documents within a category. Lower numbers appear first.

## Project Structure

```
sealsign-docs/
├── docs/                   # English documentation (source)
│   └── <category>/
│       └── *.md
├── i18n/                   # Translation files
│   └── es/
│       └── docusaurus-plugin-content-docs/
│           └── current/   # Spanish documentation
├── src/                    # React components and custom code
├── docusaurus.config.ts    # Docusaurus configuration
├── sidebars.ts            # Sidebar configuration
└── package.json
```
