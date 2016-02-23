# Magic Console (alpha)
> Interactive programming for Atom

Magic Console is a package for [Atom](https://atom.io/) that evaluates code in [pretty much any language](#supported-programming-languages) and renders the output alongside the source code. If that alone weren't good enough, it also visualizes the outputs in a human-friendly way (e.g. string as Markdown, array as table, object/dictionary as tree). Wait there's more! Visualizations are entirely pluggable, you can take advantage of the [thousands of visualizations](#) created by the community (coming soon!) or create a completely custom visualization.

![](/docs/live-edit.gif)

## Features

* **Visual**
  * Automatically visualize [common data types](#supported-data-types)
  * Pluggable visualizations (using React components)
* **Interactive**
  * Static and dynamic visualizations
  * Re-evaluate source code on save
  * Hot reload visualizations on save
    * Automatically install NPM dependencies when declared in visualization source (coming soon!)
  * Scrub between past output states
* **Universal**
  * Support for 64 programming languages (don't see your programming language, you can add support for it with a [couple lines of code](#add-a-programming-language))
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

Use Magic Console to try out code, explore data, run experiments, etc.

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

## Appendix

### Supported programming languages

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

### Supported data types

* String
  * Markdown
  * Raw
* Number
  * Raw
* Array
  * ObjectTree
  * Raw
* Object/dictionary
  * ObjectTree
  * Raw
* Regex
  * Raw
* Boolean
  * Raw
* HTML element
  * ReactComponent
  * Markdown
  * Raw
* React component
  * ReactComponent
  * ObjectTree
  * Raw

### Add a programming language

```coffeescript
Clojure:
  "Selection Based":
    command: "lein"
    args: (context)  -> ['exec', '-e', context.getCode()]
  "File Based":
    command: "lein"
    args: (context) -> ['exec', context.filepath]
```
