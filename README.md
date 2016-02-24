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

## Getting started

### Install

See [Contributing](#setup) for *alpha* install instructions

<!-- * Install Atom
* Install script using Atom's in-app package manager or using apm
  * `apm install script`
* Install magic-console using Atom's in-app package manager or using apm
  * `apm install magic-console`
* OS X: Install atom-fix-path to avoid $PATH issues
  * `apm install atom-fix-path` -->

### Usage

* **Magic Console: Toggle** to evaluate the current file
  * The current file must be [supported](#supported-programming-languages) and the required runtime must be installed
  * If Atom isn't detecting the grammar (programming language) of the current file (look in the bottom-right corner for the name of the grammar), [install the grammar](https://atom.io/packages/search?utf8=%E2%9C%93&q=language) and try again
* If the output panel is open, Magic Console will watch the file for changes and re-evaluate on save
  * This can be disabled in the package settings
* The output panel displays a list of outputs
  * Toggle between available visualization plugins using the plugin selector
  * Edit the visualization plugin's source code using the <i class="octicon octicon-code"></i> button
  * Copy the outputs using the <i class="octicon octicon-clippy"></i> button at the top
  * Clear the outputs using the <i class="octicon octicon-trashcan"></i> button at the top

#### Commands

| Command                               | OS X                 | Linux/Windows         | Notes                                                        |
|:--------------------------------------|:---------------------|:----------------------|:-------------------------------------------------------------|
| Magic Console: Toggle                 | <kbd>CMD+ENTER</kbd> | <kbd>CTRL+ENTER</kbd> | If text is selected only the selected code will be evaluated |
| Magic Console: Open plugins directory |                      |                       | Open the plugins directory in a new workspace                |
| Magic Console: Create new plugin      |                      |                       | Create a new plugin and open it in the current workspace     |

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

## Known bugs

* Default visualization plugin is an arbitrary selection from the available plugins for that data type but should be the "richest" for the given data type (e.g. LineChart for valid data vs. ObjectTree)
  * Workaround: Manually select the richest visualization
* Plugin state is not preserved after plugin hot reload
* Emojis don't display in Markdown plugin
  * [Github issue](https://github.com/jonschlinkert/remarkable/issues/62)
  * Workaround: Use Raw plugin

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

* [@nodejs](https://github.com/nodejs) for enabling all of this innovation
* [@atom](https://github.com/atom) for providing the first truly hackable text editor and IDE
* [@facebook/react](https://github.com/facebook/react) for providing a much better way to do UI
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
