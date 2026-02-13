# Astro issue #15417 minimum example

- [Missing support for remote image configuration at the content-layer · Issue #15417 · withastro/astro](https://github.com/withastro/astro/issues/15417)
  - related with [[GitHub] erkobridee/strapicms-astro-client](https://github.com/erkobridee/strapicms-astro-client)

## TODO

- Define an Astro Collection with a custom loader to simulate the scenario of the reported issue

## Local Development

- [VS Code](https://code.visualstudio.com/) + [Development Containers](https://containers.dev/) ( [Customizations](https://containers.dev/supporting#visual-studio-code) | [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) )
  - [[GitHub] erkobridee/devcontainer-hello](https://github.com/erkobridee/devcontainer-hello) - Learning about Development Containers

## import path alias

It's commonly used the pattern `@* -> src/*`, but this approach annoys me due to the current npm package namespaces ( [scopes | npm docs](https://docs.npmjs.com/about-scopes) ) which normally start with `@{user_name/org_name}`.

Following a Linux/Unix OS approach, we have the following alias mapping `~/* -> src/*` ( [tsconfig.json](/tsconfig.json) ) which avoids the issue from `@`.

### Editor Setup

- [Editor Setup | Astro Docs](https://docs.astro.build/en/editor-setup/)
  - [ESLint](https://docs.astro.build/en/editor-setup/#eslint)
    - [[GitHub] ota-meshi/eslint-plugin-astro](https://github.com/ota-meshi/eslint-plugin-astro)

  - [Prettier](https://docs.astro.build/en/editor-setup/#prettier)
    - [[GitHub] withastro/prettier-plugin-astro](https://github.com/withastro/prettier-plugin-astro)

- [Get VSCode, eslint & prettier working with Astro | Geek's blog](https://patheticgeek.dev/blog/astro-prettier-eslint-vscode) (2023/02/11)

- [Effortless Code Styling: Configuring Astro with Prettier, ESLint, and Tailwind CSS | Raj Vadeghar](https://r44j.dev/blog/beginner-s-guide-to-setting-up-astro-astro-prettier-eslint-tailwind-css/) (2024/03/03)

## Test it online

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/erkobridee/astro-issue-15417-min-example)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/erkobridee/astro-issue-15417-min-example?devcontainer_path=.devcontainer/devcontainer.json)
