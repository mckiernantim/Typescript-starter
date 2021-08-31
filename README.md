# Intro to Typescript 
This Readme will walk you through the fundamentals of working with Typescript.
In it we will discuss setting up TS on our machine, some basics in working with TS types, defining our own types, working with functions, and finally the conept of generics.

Quicklinks: 
[Getting Started](#getting-started),
[Basic Types](#basic-types),
[Objects and Classes](#objects-and-classes),
[Generics](#functions-and-generics)

    

## What is Typescript?

Typescript is a superset of Javascript devleoped by Microsoft.  Typescripts main goal is to help developers catch mistakes earlier by enforcing a static typing system. Typescript compiles into Javascript and can be used in with an Javascript files of frameworks.

Example: a simple JS function
```js
const add = (a,b) => {
    return a+b
}
// Great!
add(1,2) 
// Not Great! 
add(1,"2")   
```
Now in TS:
```TS
const add = (a:number, b:number) => {
    return a+b
}
// No error
add(1,2)
// Typescript throws an error because second arg is not a number
add(1,"2")
```

When working with TS all of our files are checked to ensure that we are using proper typings at all times and that all variables are of a declared type.  When we are ready, we compile our TS files to JS files that the broswer can then understand and use.

# Getting Started

To begin to work with Typescript first we need to install it globally on our machine
###
    $ npm install -g typescript

## Initializing a project

To inizialize a project navigate to a directoy and type the following :

    $ tsc --init

This will create a `tsconfig.json` file with all the specifications for our project.

## Create a file.
Next, we need to make a .ts file in order to work with TS.  

    $ touch index.ts

Open `index.ts` and declare a variable with the following syntax :
```ts

    let myVar = "Welcome to Typscript"

```

To compile `index.ts` to Javascript we need to run the following :

    $ tsc

Now we should see a new `index.js` file in our directory that Typescript compiled for us


# Basic Types
documentation on basic types can be found [here](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
 
 Typescript has defined types for all of the basic data types we use in JS.  In order to run develop with Typescript at its most efficent we need to invoke those Types to catch errors in development and take advantage of Typescripts robust Intellisense features. To type a variable we must provide it a `:` before delcaring the type.
For example:
```ts
    let myNum:number
```

The variable myNum can now be assigned a new value but that vlaue must be a <em>number</em>, otherwise typescritpt will throw an error

### Any

Variables with `any` type are just that - anything.  All ariables declared implicitly have `any` type. Using `any` should be avoided as it reduces the specificty of your type checking. Failing to define a type will throw an error as implicit any types are to be avoided.

```ts
Implicit `any` type.

      let myVar  

Explciit `any` type.

     let myVar:any 
```

### Strings
Strings follow the same typing pattern as any and function just as they do in JS

```ts
// Implicit string declaration:

let myStr ="this is a string"

// Explicit string declaration:

let myStr:string 
```

### Numbers 
Numbers follow the same pattern as strings.
```ts

// Implicit number declaration:

let myNum =12

// Explicit string declaration:

let myNum:number 
```

### Booleans
```ts
// Implicit boolean declaration:

    let myBool = true

// Explicit boolean declaration:

    let myBool:boolean
```
### Unions

A union is a new concept in TS that allows a variable to be a number of spceified types in the event we want more flexibility in our variables.

```ts
    let myUnion:(number | string) = "hello"
        // we can do this
        myUnion = 10
        // this throws an error
        myUnion = []
```
In the above code we specify that myUnion can be number OR a string and then assign it a string value and reassign it to the value of a number.

### Arrays

When working with TS we need to define the type of data our Arrays will allow.  Arrays default to `any` upon declaration but will then be strictly typed to whatever value is in them at declaration.  Attempting to add the wrong type to the array will throw an error.

```ts
// Explicit string array
let myArr:string[] = []
// Implicit string array
let myArr = ["hello","from","array"]
// eplicit number array
let numARr:number[] = [1,2,3]
 ```

 ### Tuples

A Tuple is a type of an array that requires specific types in a specific order.  It's a new concept that we don't see in JS but TS allows us to check that an array we declare matches the pattern we set forth.  Tuples must be initialized before assigning values.

```ts
// Here we declare the Type of myTup with : and say it MUST have a strong, number, and Function. 
let myTup: [string, number, Function]
// Here we define values that correspond to our Tuple rules we declared on myTup

// this works

 myTup =  ["has to be string", 20, ()=> {}]
// this will throw an error
 myTup = [20,20,20]
```
Note: Tuples behave strangely with regards to Array methods.  Methods like `.push()` or `.pop()` will work on a Tuple but we cannot assign values via index.  It is possible to do the following:

```ts
    let myTup:[string, number] = ["hi", 2]
    // this works
    myTup.push(1)
    // this will not 
    myTup[3] = 1

```
# Objects and Classes
For a deep dive on Objects click [here](https://www.typescriptlang.org/docs/handbook/2/objects.html)
 ### Aliases
At the core of TS is the concept of reusing code.  Eventually we will run into a situation where we want to define a type to keep our code DRY.  Aliases allow us to store type declaration in a variable for later use.  Aliases can be used to define an object type or as a variable for primitives
```ts
// we declare a new Type that can be used in our files
type stringNum = string | number
// here we define a Point type and TS will check that any point we declare has an X and Y value that both are numbers
type Point = {
     x:number,
     y:number
}
```

### Interfaces

Interfaces are used to define specific objects in TS and are very simmilar to Aliases but with one distinct difference; Aliases cannot be reopened after declaration, meaning once you declare values on an alias - thats it.  Interfaces can be extended with the use of the `extends` keyword allowing new interfaces to inherit values from the original Interface.

```TS
// here is a simple dog interface with a kew of name and a value of string
interface Dog{
    name:string
} 

// Here we declare another interface Pug, that extends dog bringing with it all of the properties from Dog and adding a key of epic that must be true
interface Pug extends Dog {
    epic:true
}

// here we declare myPug as Pug type which TS now knows needs a `name` and `epic` key 
const myPug:Pug ={
    name:"Boss",
    epic:true
}
```
### Classes

Just like in vanilla JS classes can be declared in TS to be instantiated and used in our files.  Classes in TS are very similar to Interfaces but Classes allow us to define our logic used inside them while Interfaces only allow us to say that a Function exists on the interface.  
Example

```ts
class BankAccount {
    uid;
    ammount;
    constructor(uid:number, ammount:number){
        this.uid = uid;
        this.ammount = ammount;
    }
    // We can define this function in a class but not in an interface
    printMoney(){
        console.log(this.ammount)
    }
}
```

You may have noticed that the syntax for declaring a function requires us to declare attributes before the constructor.  This is because TS is so specific it actually compiles a type inside of the class to define what can be passed into the constructor.

Classes also allow us to make our variables `private` or `public` which can limit access to manipulate the data.  For example, if a user had access to their `ammount` in a bank account they might just put a few extra zeroes on the end.  In order to protect our account we can make the `ammount` private. We do this by removing the private attribute from our inital declaration and prepending the ammount with the `private` keyword in the constructor.

More on classes [here](https://www.typescriptlang.org/docs/handbook/2/classes.html)
```ts

class BankAccount {
    uid;
    constructor(uid:number, private ammount:number){
        this.uid = uid;
        this.ammount = ammount;
    }
    // now the only way to access our acount is by invoking our printMoney functions
    printMoney(){
        console.log(this.ammount)
    }
}
```
 

# Functions and Generics

### Functions

Functions can be declared in TS file just as any other type.  Functions can be passed to any other Alias or Interface that requires a type.  
```ts
// explicit
let myFunc:Function = () => { 
    console.log("hello") 
}
// implicit
let otherFunc = () => {
    console.log("hello again")
}
```
Additionally, TS allows us to specify what our function <em> returns </em>
```ts
// By adding :number after our () we let TS know that this function not only MUST return a value but that value Must be a number.
const myFunc:Function = () :number => { 
    return 1 
}
```
We can also specify what are types of arguments are allowed to pass to a function 
```TS
// In the following we declare that arg must be a string and must return a string
const upperCase = (arg:string) :string => {
    return arg.toUpperCase()
}
```
We can even define optional parameters

```TS
// here we add two numbers but the third is declared optional with a `?` after it.
const add3 = (a:number, b:number, c?:number ) => {
  if(c) { return a+b+c}
    return a+b
}
// both of these will work
add3(1,2,3) 
add3(1,2)
```

### Void 
Void is a special type in TS that is used to tell the TS compiler not to look for a return in this function.  Void is different from `undefined` or `null` in that it has zero values wheres `undefined` is a declared variable that has not yet been given value and `null` is in fact an object.  
more on Void [here](https://www.typescriptlang.org/docs/handbook/2/functions.html#void)
```TS
// here we add two numbers but the third is declared optional with a `?` after it.
const doesNothing = () => {
  console.log("this does nothing")
}
const alsoDoesNothing = (): void => {
    console.log("both are void")
}

```


### Generics

Generics are what we use to implement a function that needs the flexibility of taking in any number of Types but still returns those types. To declare a Generic type for an class or funciton
by doing the following:
```TS
// The folliwing line declares a Generic called unkownType between the < > 
const myGeneric = <unkownType> (arg:<unkownType>) :unknownType => {
    return arg
}
```
Now for a more concrete example. Let's say we need a function that takes an argument and returns an Array of the same type of argument with the original argument inside. 
```TS
// here we initialize a function to accept a Generic called something
// then type our argument as the Generic something
// lastly we return from this function a something array by appending the funciton :something[]
let makeTypedArr = <something>(arg:something):something[]=> {
    let typeArr:something[] = [];
    typeArr.push(arg);
    return typeArr
}
```

    
