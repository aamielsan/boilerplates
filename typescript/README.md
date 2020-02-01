# Typescript template
Contains various templates for your development needs. Feel free to branch out, and add your own.

## Getting Started

### `package.json` setup
  The `package.json` has already been pre-configured for this template.

  Changes you need to do:
  1. Update the module name under `package.json`

  Changes you could do:
  1. Update the default entry point: `dist/app.js`. If you need to edit the entry point, just find and replace all occurence of `app.js` to your new entry point.

### `@types/` development dependencies
  Typescript heavily relies on the typescript definition of the modules that you are using. Some modules has this definition included within the module; others you have to install seperately.

  [TypeSearch](https://microsoft.github.io/TypeSearch/) lets you find those definitions for modules that don't include the type definitions themselves.

  1. Search for the module under TypeSearch. (i.e. `winston`)
  2. If a result comes up, that means that you can install that type definition by: `npm install --save-dev @types/module_name`. In our example, `npm install --save-dev @types/winston`.

