---
sidebar_position: 2
---

# Examples

## Variables, DataTypes, Arrays And HashMaps
```js
// Integers & arithmetic expressions...
let currentVersion = 1 / 100;

// ... and strings
let programName = "The Oink Lang";

// ... booleans
let isnotFalse = true;

// ... arrays & hash maps
let favouriteScientist = [{"name": "Richard P. Feynman", "wonNobelPrize": true}, {"name": "Sir. Issac Newton", "wonNobelPrize": false}];

```
## User Defined Functions and Built-in Functions

### User Defined Functions
```js
let getName = fn(person) { person["name"]; };
getName(favouriteScientist[0]); // => "Richard P. Feynman"
getName(favouriteScientist[1]); // => "Sir. Issac Newton"

// Simple Fibonacci Function
let fibonacci = fn(x) {
  if (x == 0) {
    0;
  } else {
    if (x == 1) {
      1;
    } else {
      fibonacci(x - 1) + fibonacci(x - 2);
    }
  }
};

fibonacci(10);
```
### Built-in Functions
```js
//puts(arg1,arg2<optional>) Prints to StdOut
puts("Hello World!");
//len(arg) Returns An Integer that is the Size off the arg Array
len("Oink Oink"); 
len([0,1,2,3,4,5]);
//first(arg) Returns the first element of the arg Array
first([1,2,3]);
//last(arg) Returns the last element of the arg Array
last([4,5,6]);
//rest(arg) Returns an Array with the first Element Removed of the arg Array
rest("KSmile")
//push(arg1, arg2) Returns An New Array With arg2 Element added to the arg1 Array 
push([0,1,2,3,4,5,6,7,8,9],10)
```
## Conditions And Closures
### if else
```js
//Simple If Logics
if (true) {
  1;
} else {
  0;
}
```
### Operators
```js
1 + 2 + (1 * 2) - (1 / 2);
!true;
!false;
+1;
-5;
"Hello" + " " + "World";
```
### Return
```js
if (true) {
  return;
}

let square = fn(x) {
  return x*x;
};

square(5);
```
### Closures
```js
let someAdder = fn(x, y) {
    fn(z) { x + y + z };
};
let adder = someAdder(1, 2);

adder(8); // => 11
```