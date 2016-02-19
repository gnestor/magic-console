# Runtimes

Magic Console consumes the script Atom package which is responsible for mapping source code grammars to runtimes and evaluating the source code. script currently support 64 programming languages:

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

## Add a programming language

Additional programming languages can be added to script's [grammars.coffee](https://github.com/rgbkrk/atom-script/blob/master/lib/grammars.coffee).

1. Fork the repo
2. Add a new runtime
3. Submit a PR

### Clojure example

```coffeescript
Clojure:
  "Selection Based":
    command: "lein"
    args: (context)  -> ['exec', '-e', context.getCode()]
  "File Based":
    command: "lein"
    args: (context) -> ['exec', context.filepath]
```
