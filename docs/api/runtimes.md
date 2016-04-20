# Runtimes

Magic Console consumes the [script Atom package](https://github.com/rgbkrk/atom-script) service which is responsible for mapping source code grammars to runtimes and evaluating the source code. script currently supports 64 programming languages:

* 1C (BSL) <sup>[Ø](#o-stroke)</sup>
* AppleScript
* Bash <sup>[**](#double-asterisk)</sup>
* Behat Feature
* C <sup>[*](#asterisk)</sup><sup>[‡](#double-dagger)</sup>
* C++ <sup>[*](#asterisk)</sup><sup>[‡](#double-dagger)</sup>
* C# Script <sup>[*](#asterisk)</sup>
* Clojure (via Leiningen) <sup>[ϖ](#pi)</sup>
* Coffeescript
* CoffeeScript (Literate) <sup>[^](#caret)</sup>
* Crystal
* Cucumber (Gherkin) <sup>[*](#asterisk)</sup>
* D <sup>[*](#asterisk)</sup>
* DOT (Graphviz)
* Elixir
* Erlang <sup>[†](#dagger)</sup>
* F# <sup>[*](#asterisk)</sup>
* Forth (via GForth)
* Gnuplot
* Go <sup>[*](#asterisk)</sup>
* Groovy
* Haskell
* ioLanguage (http://iolanguage.org/)
* Java <sup>[***](#triple-asterisk)</sup>
* Javascript
* [JavaScript for Automation](https://developer.apple.com/library/mac/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/Introduction.html) (JXA)
* Jolie <sup>[*](#asterisk)</sup>
* Julia
* Kotlin
* LaTeX (via latexmk)
* LilyPond
* Lisp (via SBCL) <sup>[⍵](#omega)</sup>
* Literate Haskell <sup>[*](#asterisk)</sup>
* LiveScript
* Lua
* Makefile
* MoonScript
* MongoDB
* [NCL](http://ncl.ucar.edu)<sup>[#](#hash)</sup>
* newLISP
* Nim (and NimScript)
* NSIS
* Objective-C <sup>[*](#asterisk)</sup><sup>[‡](#double-dagger)</sup>
* Objective-C++ <sup>[*](#asterisk)</sup><sup>[‡](#double-dagger)</sup>
* OCaml <sup>[*](#asterisk)</sup>
* Pandoc Markdown <sup>[††](#two-daggers)</sup>
* Perl
* Perl 6
* PHP
* PostgreSQL <sup>[§](#section)</sup>
* Python
* RSpec
* Racket
* [RANT](https://github.com/TheBerkin/Rant)
* Ruby
* Ruby on Rails
* Rust
* Sage
* Sass/SCSS <sup>[*](#asterisk)</sup>
* Scala
* Shell Script <sup>[**](#double-asterisk)</sup>
* Swift
* TypeScript
* Dart
* Octave
* Zsh <sup>[**](#double-asterisk)</sup>
* Prolog <sup>[¢](#cents)</sup>

**NOTE**: Some grammars may require you to install [a custom language package](https://atom.io/search?utf8=✓&q=language).

You only have to add a few lines in a PR to support another.

### Limitations

<a name="o-stroke"></a><sup>Ø</sup> 1C (BSL) code runs through [OneScript](http://oscript.io/) interpreter in console mode.

<a name="caret"></a><sup>^</sup> Running selections of code for CoffeeScript (Literate) only works when selecting just the code blocks

<a name="dagger"></a><sup>†</sup> Erlang uses `erl` for limited selection based runs (see [#70](https://github.com/rgbkrk/atom-script/pull/70))

<a name="asterisk"></a><sup>*</sup> Cucumber (Gherkin), D, Go, F#, Literate Haskell, Jolie, OCaml, PowerShell, and Swift do not support selection based runs

<a name="omega"></a><sup>⍵</sup> Lisp selection based runs are limited to single line

<a name="pi"></a><sup>ϖ</sup> Clojure scripts are executed via [Leiningen](http://leiningen.org/)'s [exec](https://github.com/kumarshantanu/lein-exec) plugin. Both `Leiningen` and `exec` must be installed

<a name="double-dagger"></a><sup>‡</sup> C, C++, Objective-C, and Objective-C++ are currently only available for Mac OS X (where `process.platform is 'darwin'`). This is possible due to the commands `xcrun clang` and `xcrun clang++`. **NOTE**: Xcode and the Xcode command line tools are required to ensure `xcrun` and the correct compilers on your system.

<a name="hash"></a><sup>#</sup> NCL scripts must end with `exit` command for file based runs

<a name="two-daggers"></a><sup>††</sup> Requires the panzer pandoc wrapper https://github.com/msprev/panzer and the pandoc-flavored-markdown language package in Atom https://atom.io/packages/language-pfm

<a name="section"></a><sup>§</sup> Requires the atom-language-pgsql package in
Atom https://atom.io/packages/language-pgsql.  Connects as user `$PGUSER` to
database `$PGDATABASE`. Both default to the operating system's user name and both
can be set in the process environment or in Atom's `init.coffee` script:
`process.env.PGUSER = ⟨username⟩` and `process.env.PGDATABASE = ⟨database name⟩`.

<a name="double-asterisk"></a><sup>\**</sup> The shell used is based on your default `$SHELL` environment variable.

<a name="triple-asterisk"></a><sup>\***</sup> Windows users should manually add jdk path (...\jdk1.x.x_xx\bin) to their system environment variables.

<a name="cents"></a><sup>¢</sup> Prolog scripts must contain a rule with the head `main` (e.g.`main:- parent(X,lucas),writeln(X).`). The script is executed with the goal `main` and is halted after the first result is found. The output is produced by the `writeln/1` predicates. It requires swipl.

## Add a runtime

Additional runtimes can be added to script's [grammars.coffee](https://github.com/rgbkrk/atom-script/blob/master/lib/grammars.coffee).

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
