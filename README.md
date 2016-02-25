# Magic Console (alpha)
> Interactive programming for Atom

Magic Console is a package for [Atom](https://atom.io/) that evaluates code in [pretty much any language](#supported-runtimes) and renders the output alongside the source code. If that alone weren't good enough, it also visualizes the outputs in a human-friendly way (e.g. string as Markdown, array as table, object/dictionary as tree). Wait there's more! Visualizations are entirely pluggable, so you can take advantage of the [core plugins](http://gnestor.github.io/magic-console/docs/plugins/core.html) and [plugins created by the community](http://gnestor.github.io/magic-console/docs/plugins/community.html) or create a custom plugin for your specific application.

![](/docs/live-edit.gif)

## Features

* **Visual**
  * Automatically visualize [common data types](http://gnestor.github.io/magic-console/docs/plugins/core.html)
  * Pluggable visualizations ([using React components](http://gnestor.github.io/magic-console/docs/api/plugins.html))
* **Interactive**
  * Static and dynamic visualizations
  * Re-evaluate source code on save
  * Hot reload visualizations on save
    * Automatically install NPM dependencies when declared in visualization source (coming soon!)
  * Time-travel between past output states
* **Universal**
  * Support for [64 programming languages](#supported-runtimes) (don't see your programming language, you can add support for it with a [couple lines of code](#add-a-runtime))
  * Atom is cross-platform (OS X, Windows, Linux) and open-source
* **Plug and play**
  * No configuration necessary
  * No (dev) server necessary

## Practical applications

### Interactive playground

![](/docs/playground.png)

Use Magic Console to try out code, explore results, run experiments, etc.

### Interactive testing

![](/docs/tests.png)

Use Magic Console to test code as you write it. Since you are evaluating your code in real-time, you don't *need* to write tests. Nonetheless, you can write assertions against your code and render the outputs using the Test plugin.

### Interactive documentation

![](/docs/docs.png)

Use Magic Console to mix Markdown documentation with interactive code examples.

## Getting started

### Install

See [Contributing](#setup) for *alpha* install instructions

<!-- * Install Atom
* Install Magic Console using Atom's in-app package manager or using apm
  * `apm install magic-console`
* Install script and fix-path (OS X only) packages using Atom's in-app package manager or using apm
  * `apm install script fix-path`
* Link the directory
  * `apm link`
    * This will error if a previous version of magic-console exists, in which case remove the existing version and try again -->

#### Commands

| Command                               | OS X                 | Linux/Windows         | Notes                                                        |
|:--------------------------------------|:---------------------|:----------------------|:-------------------------------------------------------------|
| Magic Console: Toggle                 | <kbd>CMD+ENTER</kbd> | <kbd>CTRL+ENTER</kbd> | Evaluate current file or selected text |
| Magic Console: Open plugins directory |                      |                       | Open the plugins directory in a new workspace                |
| Magic Console: Create new plugin      |                      |                       | Create a new plugin and open it in the current workspace     |

## FAQ

> I don't see any output...

The runtime for the source code must be [supported by Magic Console](#supported-runtimes) and installed. For example, if your source code is a CoffeeScript file, then as long as the [coffee-script runtime](https://www.npmjs.com/package/coffee-script) is installed, you're good to go because CoffeeScript is supported. If your source code is a [Dogescript](https://dogescript.com/) file, then you would need to [add that runtime](#add-a-runtime) because it's not supported yet and have [dogescript runtime](https://www.npmjs.com/package/dogescript) installed.

> I'm getting compilation errors...

Check out the active grammar for your source code in the lower-right side of the bottom status bar and make sure that it matches the programming language you are using. For example, if you are writing ES6 Javascript and you are seeing "Javascript" and not "Babel ES6 Javascript," you need to [install](https://atom.io/packages/search?utf8=%E2%9C%93&q=language) the "Babel ES6 Javascript" grammar and use it instead.

> I'm getting "[runtime command] not found" error...

Make sure that the path to your runtime binary is in Atom's $PATH. You can do this by opening Atom's Dev Tools and typing `process.env.PATH` in the console. If you don't see the path to your runtime binary, then you can use the [fix-path Atom package](https://atom.io/packages/atom-fix-path) to add it or move your binary to one of the available paths.

> How do I?

* **Watch a file:** Enable "Evaluate on save" in Magic Console's package settings
* **Toggle between visualizations/plugins?:** Hover over an output and use the drop-down selector to toggle between plugins available for that data type
* **Edit a plugin's source code:** Hover over the plugin and click the <i class="octicon octicon-code">code</i> button. The plugin source code will open in a new editor panel and allow you to edit the source code inline with its rendering. When the source code is saved, it will be hot reloaded and the rendering will be updated instantly.
* **Clear the outputs:** Hover out the outputs and click the <i class="octicon octicon-trash">clear</i> button at the top.
* **Copy/paste output:** Hover over the outputs and click the <i class="octicon octicon-clippy">copy</i> button at the top to copy the raw output data to the clipboard.

## Contributing

Use the Atom [contributing guidelines](https://atom.io/docs/latest/contributing)

### Setup

* Install Atom
* Clone the repo
  * `git clone https://github.com/gnestor/magic-console.git`
  * `cd magic-console`
* Install the dependencies
  * `npm install`
* Install script and fix-path packages
  * `npm run apm` or `apm install script fix-path`
* Link the directory
  * `apm link`
    * This will error if a previous version of magic-console exists, in which case remove the existing version and try again

### Workflow

* Run Atom in dev mode
  * `atom --dev`
* Re-install dependencies after pulling upstream changes
  * `apm install`
* Submit a pull request!

### Thanks

* [@nodejs](https://github.com/nodejs), [@atom](https://github.com/atom),  [@facebook/react](https://github.com/facebook/react) for laying the foundation
* [@rgbkrk](https://github.com/rgbkrk) and community for [atom-script](https://github.com/rgbkrk/atom-script)
* [@jupyter](https://github.com/jupyter) and [@nteract](https://github.com/nteract) communities for inspiration

## Appendix

### Supported runtimes

* 1C (BSL)
* AppleScript
* Bash
* Behat Feature
* C
* C++
* C#
* cript
* Clojure (via Leiningen)
* Coffeescript
* CoffeeScript (Literate)
* Crystal
* Cucumber (Gherkin)
* D
* DOT
* Elixir
* Erlang
* F#
* Forth (via GForth)
* Go
* Groovy
* Haskell
* Java
* Javascript
* JavaScript for Automation (JXA)
* Julia
* Kotlin
* LaTeX (via latexmk)
* LilyPond
* Lisp (via SBCL)
* Literate Haskell
* LiveScript
* Lua
* Makefile
* MoonScript
* MongoDB
* NCL#
* newLISP
* Nim (and NimScript)
* NSIS
* Objective-C
* Objective-C++
* OCaml
* Pandoc Markdown
* Perl
* Perl 6
* PHP
* PostgreSQL
* Python
* RSpec
* Racket
* RANT
* Ruby
* Ruby on Rails
* Rust
* Sage
* Sass/SCSS
* Scala
* Shell Script
* Swift
* TypeScript
* Dart
* Octave
* Zsh
* Prolog

<!-- ### Supported data types

| Plugin         | Data type                               | Notes                                               |
|----------------|-----------------------------------------|-----------------------------------------------------|
| Color          | object, string                          | hex string, rgb/hsl object                          |
| Latex          | string                                  | wrapped in '$$'                                     |
| LineChart      | array                                   | array of objects with either 'data' or 'y' property |
| Markdown       | string                                  | any string                                          |
| Mermaid        | string                                  | starts with 'sequenceDiagram', 'graph', or 'gantt'  |
| ReactComponent | object                                  | with 'type' and 'props' properties                  |
| Regex          | regex, string                           | wrapped in '/'                                      |
| Table          | array                                   | array of objects                                    |
| Test           | error, boolean, undefined, null, string | data types or their string equivalent               | -->

### Add a runtime

```coffeescript
Clojure:
  "Selection Based":
    command: "lein"
    args: (context)  -> ['exec', '-e', context.getCode()]
  "File Based":
    command: "lein"
    args: (context) -> ['exec', context.filepath]
```
