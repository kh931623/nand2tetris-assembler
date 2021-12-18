# hack-assembler-in-node

This is the Assembler for [nand2teris](https://www.nand2tetris.org/project06) project 6. It is written in Node.js with functional programming paradigm.


## Modules

### Index
This module is the entry point of the Assembler and its purpose is handling side effects:
1. Reading source code from file
2. Writing compiled machine code to file

Dependencies:
1. [Compile module](#compile) for compilation

### Compile
This module controls the flow of compilation process. 

Dependencies:
1. [Parse module](#parse) for parsing source code to token
2. [Generate Code module](#generate-code) for transform token to machine code
3. [Symbols module](#symbols) for constructing symbol map.
### Parse
This module parses source code into tokens.

### Generate Code
This module transforms tokens into machine code

### Symbols
This module construct symbol map from source code