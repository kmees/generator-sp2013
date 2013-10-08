# Sharepoint 2013 generator

Yeoman generator for scaffolding out a SharePoint 2013 HTML Master & Page
Layouts project.


## Getting Started

- Make sure you have [yo](https://github.com/yeoman/yo) installed: `npm install -g yo`
- Install the generator: `npm install -g generator-sp2013`
- Run: `yo sp2013`
- Run `grunt` for building and `grunt server` for preview


## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.

* `--skip-install-message`

  Hides the output of `bower` and `npm`.

* `--skip-welcome-message`

  Skips the welcome message.

* `--test-framework=[framework]`

  Defaults to `mocha`. Can be switched for
  another supported testing framework like `jasmine`.

## Features

The following features are currently supported by the SP2013 generator.

### JS Precompilers

The following JS Precompilers are supported:

  * CoffeeScript
  * TypeScript
  * LiveScript

Using a JS Precompiler is not required.

### CSS Precompilers

The following CSS Precompilers are supported:

  * Compass (SCSS/SASS)

Using a CSS Precompiler is not required.

### WebDAV deployment

Grunt task for deploying your project to SharePoint via WebDav. Supports either
an absolute WebDav path (single developer) or a WebDav path stored in an
environment variable (multiple developers).

Grunt Task: `grunt deploy`


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
