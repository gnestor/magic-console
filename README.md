# Magic Console
> Interactive programming for Atom

Magic Console is a package for [Atom](https://atom.io/) that evaluates code in [pretty much any language](#supported-programming-languages) and renders the outputs alongside the source code. If that alone weren't good enough, it also visualizes the outputs in a human-friendly (e.g. string as Markdown, array as table, object/dictionary as tree). Wait there's more! Visualizations are entirely pluggable, you can take advantage of the [thousands of visualizations](about:blank) created by the community or create a completely custom visualization.

## Features

* **Visual**
  * Automatically visualize [common data types](#supported-data-types)
  * Pluggable visualizations (using React components)
* **Interactive**
  * Static and dynamic visualizations
  * Re-evaluate source code on save
  * Hot reload visualizations on save
    * Automatically install NPM dependencies when declared in visualization source
* **Universal**
  * Support for 64 programming languages (don't see your programming language, you can add support for it with a [couple lines of code](#add-a-programming-language))
  * Atom is cross-platform (OS X, Windows, Linux) and open-source
* **Simple**
  * No configuration necessary
  * No (dev) server necessary

## Getting started

### Install

* Install Atom
* Install atom-script using Atom's in-app package manager or using apm
  * `apm install script`
* Install magic-console using Atom's in-app package manager or using apm
  * `apm install magic-console`

### Usage

* Press `CMD+ENTER` (on OS X) or `CTRL+ENTER` (on Windows) to evaluate the current file
  * The current file must be [supported](#supported-programming-languages) and the required binary to run the file must be installed
  * If Atom isn't detecting the grammar (programming language) of the current file (look in the bottom-right corner for the name of the grammar), [install the grammar](https://atom.io/packages/search?utf8=%E2%9C%93&q=language) and try again
* If the outputs panel is open, saving the current file will trigger a re-evaluation
  * This can be disabled in the package settings
* The outputs panel displays a list of outputs (stdout and stderr messages)
  * Copy the outputs using the <i class="octicon octicon-clippy"></i> button at the top
  * Clear the outputs using the <i class="octicon octicon-trashcan"></i> button at the top
  * Toggle between available visualization plugins using the plugin selector in the output
  * Copy a single output using the <i class="octicon octicon-clippy"></i> button inside the output
  * Edit the visualization plugin's source code using the <i class="octicon octicon-code"></i> button inside the output
  * Create a new visualization plugin using the <i class="octicon octicon-plus"></i> button at the top

## Practical applications

### Interactive playground

![](/docs/playground.png)

Use Magic Console to try out code, explore data, run experiments, etc.

### Interactive testing

![](/docs/tests.png)

Use Magic Console to test code as you write it. Since you are evaluating your code in real-time, you don't *need* to write tests. Nonethless, you can write assertions against your code render the outputs using the Test visualization plugin. Additionally, you can import multiple modules into a single file and write integration tests or test suites against them and render the outputs.

### Interactive documentation

![](/docs/docs.png)

Use Magic Console to mix your visualized outputs with strings outputs (visualized with Markdown) to document code examples.


## Known bugs

* Default visualization plugin is an arbitrary selection from the available plugins for that data type
  * The default plugin should be the "richest" for the given data type (e.g. LineChart for valid data vs. ObjectTree)
  * Workaround: Manually select the richest visualization
* Selected visualization plugin is not preserved after re-evaluation
  * Workaround: Re-select visualization
* Re-evaluate on save doesn't work for long-running scripts (e.g. using a timer)
  * Workaround: Force re-evaluate using `CMD+ENTER`
* Emojis don't display in Markdown plugin
  * [Github issue](https://github.com/jonschlinkert/remarkable/issues/62)
  * Workaround: Use Raw plugin

## Contributing

Use the atom [contributing guidelines](https://atom.io/docs/latest/contributing)

### Setup

* Clone the repo
  * `apm develop script` will clone the `script` repository to `~/github`
  * `git clone https://github.com/gnestor/magic-console.git`
* Install the dependencies
  * `apm install`
* Link the directory
  * `apm link`
    * This will error if a previous version of magic-console exists, so remove the existing version and try again


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
*
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
