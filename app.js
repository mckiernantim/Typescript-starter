// Types 
// string
var str = "hello!";
str = " this is a new string";
str = Number(str);
// number
var num = 100;
// boolean
var bool;
bool = false;
// ANY - new one!
var whatever;
whatever = 1;
whatever = bool;
// UNIONS!   
var year;
year = 1967;
year = "1999";
//  Arrays
var arr = [];
arr.push(function () { console.log("hi"), function () { return 'world'; }; });
console.log(arr);
// TUPLES - ????
var tup;
// Objects!
var obj;
// Aliases
var alias;
//  V O I D! (Void)
var nothing;
var book = /** @class */ (function () {
    function book(title, publisher, publishYear, salesFigures) {
        this.title = title,
            this.publisher = publisher,
            this.publishYear = publishYear,
            this.salesFigures = salesFigures;
    }
    book.prototype.getSales = function () {
        console.log(this.salesFigures);
    };
    return book;
}());
var bookOne = new book("lord of the flies", "western press", 1955, 100000);
console.log(bookOne);
//   OBJECTS!
//  DOM & typecasting
var add = function (a, b) {
    return a + b;
};
// simpl display in our tempalte
var output = document.getElementById("data");
output.innerHTML = year;
