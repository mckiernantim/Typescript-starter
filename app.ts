// Types - fundamental changes in TS 
//   Typescript enforces typing via erorr messaging but will NOT stop compilation due to error

// string
let str:any= "hello!"
str =" this is a new string"
str = Number(str)
// number

let num:number = 100

// boolean
let bool:boolean;
bool = false
// ANY - new one!
let whatever:any;

whatever = 1;

whatever = bool;
// UNIONS!   
let year: number | string;
year = 1967;
year = "1999"




//  Arrays
let arr:Function[]= []
arr.push( ()=>{console.log("hi"), ()=>{return 'world'}})
console.log(arr)

// TUPLES - ????
let tup;

// Objects!
let obj;


// Aliases
let alias;


//  V O I D! (Void)
let nothing;

//interfaces
interface bookInterface {
    title:string,
    publisher:string
    publishYear:number
}

class book implements bookInterface {
    title;
    publisher;
    publishYear; 
    private salesFigures

    constructor(
        title:string, 
        publisher:string, 
        publishYear:number,
        salesFigures:number ){
        this.title = title,
        this.publisher = publisher,
        this.publishYear = publishYear,
        this.salesFigures = salesFigures
    }
    getSales(){
        console.log(this.salesFigures)
    }
}
let bookOne:book = new book(
    "lord of the flies",
     "western press", 
     1955, 
     100000 
    )
    console.log(bookOne)

//   OBJECTS!

//  DOM & typecasting
const  add = (a:number, b:number) =>{
    return a+b 
}

// simpl display in our tempalte
let output:HTMLElement = document.getElementById("data")
output.innerHTML = year


