# d3c4 VS Code Extension

Structurizr DSL preview and tooling for VS Code.

## Features

- `.dsl` file language association (`structurizr` language ID)
- Syntax-aware editing (brackets, comments, auto-closing pairs)

## Development

### Prerequisites

- Node.js 20+
- pnpm 10+

### Setup

From the monorepo root:

```bash
pnpm install
pnpm build
```

### Running the Extension (Debug)

1. Open the monorepo root in VS Code.
2. Press `F5` — this launches an **Extension Development Host** window with the extension loaded.
3. Open a `.dsl` file in the host window to activate the extension.
4. Run `d3c4: Hello World` from the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) to verify activation.

> VS Code picks up `packages/vscode` via the `.vscode/launch.json` configuration (see below).

### Adding a launch.json

Create `.vscode/launch.json` at the repo root if it does not exist:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Run d3c4 Extension",
      "type": "extensionHost",
      "request": "launch",
      "args": ["--extensionDevelopmentPath=${workspaceFolder}/packages/vscode"],
      "outFiles": ["${workspaceFolder}/packages/vscode/dist/**/*.js"],
      "preLaunchTask": "build-vscode"
    }
  ]
}
```

And `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "build-vscode",
      "type": "shell",
      "command": "pnpm --filter d3c4 build",
      "group": "build",
      "presentation": { "reveal": "silent" }
    }
  ]
}
```

### Building

```bash
# Build only this package
pnpm --filter d3c4 build

# Build everything (respects Turborepo dependency order)
pnpm build
```

### Packaging

```bash
pnpm add -g @vscode/vsce
cd packages/vscode
vsce package
```

This produces a `.vsix` file that can be installed locally via `Extensions: Install from VSIX…`.
