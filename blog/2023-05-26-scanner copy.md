---
slug: Scanner
title: Building the Scanner
authors: [abiin-kun]
tags: [notatutorial, blogging, learning in public]
---

# Writing An Scanner


### "Take big bites. Anything worth doing is worth overdoing."

### - Robert A. Heinlein, Time Enough for Love
The commencement of any compiler or interpreter involves scanning, a process where raw source code, depicted as a string of characters, undergoes segmentation into meaningful segments termed as tokens. These tokens represent the essential building blocks that define the structure and grammar of the language.

Referred to interchangeably as "scanning" or "lexing" (short for "lexical analysis") over time, these terms historically carried different interpretations. In the earlier computing era, "scanner" was specifically linked to code handling raw source code characters' retrieval from disk and subsequent buffering in memory. Meanwhile, "lexing" encompassed the phase following this, involving the useful processing of these characters.

Initiating with scanning serves as a favorable entry point for us. The task isn't overly complex; essentially, it involves a `match` statement with ambitious undertones, serving as a precursor to more intricate elements later on. By chapter's end, our aim is to construct a comprehensive and efficient scanner capable of transforming any Pig source code string into tokens, subsequently utilized in parsing.

### Tokens

Tokens represent the primary components in the language's syntax, and our initial focus will be on their implementation. They encompass diverse elements, such as identifiers, literals (like integers, floats, strings), and various operators, meticulously categorized within the `Token` enum structure.

```rust
#[derive(Debug, Clone)]
pub enum Token {
    Illegal,
    Eof,

    // Identifiers + literals
    Ident(String),  // add, foobar, x, y, ...
    Int(String),    // 123456
    Float(String),  // 123.456
    String(String), // "hello"

    // Operators
    Assign,
    Plus,
    Minus,
    Bang,
    Asterisk,
    Slash,

    Lt,
    Gt,

    Eq,
    NotEq,

    Comma,
    Colon,
    Semicolon,

    Lparen,
    Rparen,
    Lbrace,
    Rbrace,
    Lbracket,
    Rbracket,

    Function,
    Let,
    True,
    False,
    If,
    Else,
    Return,
}

```

### Scanner
With the token definitions in place, the subsequent step is the implementation of the scanner. This component traverses through each line of the source code, character by character, discerning and assembling them into respective tokens. Employing a match construct, individual characters are identified and mapped to their corresponding tokens. For instance, characters like '=', ':', ';', '(' are matched to specific tokens like `Token::Eq`, `Token::Colon`, `Token::Semicolon`, `Token::Lparen`, etc.

Furthermore, the code snippet incorporates conditional logic for complex character combinations (like '==', '!=') and other constructs such as identifiers, integers, floating-point numbers, and strings. These conditions are instrumental in accurately categorizing characters and generating respective tokens.
```rust
        match self.ch {
            '=' => {
                if self.peek_char() == '=' {
                    self.read_char();
                    tok = Token::Eq;
                } else {
                    tok = Token::Assign;
                }
            }
            ':' => {
                tok = Token::Colon;
            }
            ';' => {
                tok = Token::Semicolon;
            }
            '(' => {
                tok = Token::Lparen;
            }
            ')' => {
                tok = Token::Rparen;
            }
            ',' => {
                tok = Token::Comma;
            }
            '+' => {
                tok = Token::Plus;
            }
            '-' => {
                tok = Token::Minus;
            }
            '!' => {
                if self.peek_char() == '=' {
                    self.read_char();
                    tok = Token::NotEq;
                } else {
                    tok = Token::Bang;
                }
            }
            '*' => {
                tok = Token::Asterisk;
            }
            '/' => {
                tok = Token::Slash;
            }
            '<' => {
                tok = Token::Lt;
            }
            '>' => {
                tok = Token::Gt;
            }
            '{' => {
                tok = Token::Lbrace;
            }
            '}' => {
                tok = Token::Rbrace;
            }
            '[' => {
                tok = Token::Lbracket;
            }
            ']' => {
                tok = Token::Rbracket;
            }
            '"' => {
                tok = Token::String(self.read_string().to_string());
            }
            '\u{0}' => {
                tok = Token::Eof;
            }
            _ => {
                if is_letter(self.ch) {
                    let ident = self.read_identifier();
                    return token::lookup_ident(ident);
                } else if is_digit(self.ch) {
                    let integer_part = self.read_number().to_string();
                    if self.ch == '.' && is_digit(self.peek_char()) {
                        self.read_char();
                        let fractional_part = self.read_number();
                        return Token::Float(format!("{}.{}", integer_part, fractional_part));
                    } else {
                        return Token::Int(integer_part);
                    }
                } else {
                    tok = Token::Illegal
                }
            }
        }
```