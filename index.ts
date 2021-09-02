let myStr = "hello"

// any
let newVar:any;
let anyVar; 

newVar = 10

newVar = []

let str = ""
let str3:string;
let str2:string = "whatever"

let num = 2
let num2:number;
let num3:number = 10


let bool = true
let bool2:boolean = false
bool2 = true
// Unions

let myUnion:(number | string)
myUnion = "hello"
myUnion = 10;

// Tuple
let myTup:[number, string];
const str5 = "hi"
myTup = [1, "this"]

myTup.push("hello")

// Objects
// Aliases

type stringNum = string | number

let newerVar:stringNum = "hello"

newerVar = 10

// Interface
interface Dog {
    name:string
}
let myDog:Dog = {
    name:"boss"
}

interface Pug extends Dog {
    isCool:boolean
}
let pugDog:Pug = {
    name:"cool",
    isCool:true
}
// Classes

class Account {
    uid
    private amount
    constructor(uid:number, amount:number){
        this.uid = uid
        this.amount = amount
    }
    printMoney(){
        console.log(this.amount)
    }
}

let account = new Account(1, 1000)

account.printMoney()

let myFunc:Function = () => {
    console.log("hello")
}

let otherFunc = () => {
    console.log("other function")
}

const newFunc:Function = () :number => {
    return 1
}

const add3 = (a:number, b:number, c?:number) => {
    if(c){ 
        return a+b+c
    } else {
        return a+b
    }
}

console.log(add3(1,2))

// VOID
const doesNothing = () => {
    console.log("this does nothing")
}

// Generics

const myGeneric = <unknownType> (arg:unknownType)  :unknownType=>{
    return arg
}

let thisExample = 1

console.log(myGeneric(thisExample))

let makeTypedArr = <T>(arg:T) => {
    let typedArr: T[] = []
        typedArr.push(arg)
        return typedArr
}

let x = "str"

console.log(makeTypedArr(x))


