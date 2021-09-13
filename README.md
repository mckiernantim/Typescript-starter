# React and Typescript
Useful Documentation: [React Typescript Cheat Sheet](https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets), [Create-react-app TS docs](https://create-react-app.dev/docs/adding-typescript/#getting-started-with-typescript-and-react)


This README will walk us through how to set up a create-react-app using Typescirpt that is a simple Todo app that will allow users to create view a list of Todos .
We will cover 
 * [setting up a project](#getting-started) 
 * [defining a data `interface` to use in our components](#defining-our-data)
 * typing props we pass
 * typing state updates 
 * special steps needed to interact with React Dom elements in a TS environment

# Getting Started
Now that we have learned the fundamentals of using Typescript we need to learn how to implement it with React.  Luckily for us React and creat-react-app integrate with Typescript very smoothly.

## Initializing Project
To start ensure that you have typescript installed globally

    $ npm i typescript -g

To create a new project 
    
    $ npx create-react-app my-app-name --template typescript

Our folder structure should look familiar but all our `.jsx` files are now `.tsx`
and we have a `tsconfig.json` file and a `react-app-env.d.ts`

Our `tsconfig.json` file contains all the specifications for writing a React app in a TS environment and will run using the same scripts we are used to using in React.  

Our `react-app-env.d.ts` file tells Typescrtipt to use the node module

    @Types/react

Which Create-react-app installed for us which has a wide array of Interfaces and Types built specifically for use with React in a Typescript environment.

More on [@Types/react here](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react)

Before moving forward create a components directory, navigate into it and create 

    touch New.tsx List.tsx

Import these components into our App.tsx for later use.

# Defining Our Data

We know that Typescript requires us to define our data types every step along our code.  In order to build an app to display and manage a certain data type we need to tell TS that this type exists.  

In App.js lets declare and interface for our Todo resource

```ts
// our Todo interface will be the backbone of our app
    export interface Todo{
        title:string;
        text:string;
    }
```

Now that we have a defined `Todo` type, lets set up a `Todo[]`  in `App.tsx` to populate our app based on our new type and its specifications.

```ts
const dummyData:Todo[] = [
  {title:"first", text:"this is string"},
  {title:"second", text:"this is string"},
  {title:"third", text:"this is string"}
]
```

# Set Up Our Components and State 
Next, lets nest our `List` and `New` components inside of our `App` component so they are ready to receive props.

Next, lets establish some state for our `App.tsx` file that <em> only </em> accepts a Todo array  by prepending `<Todo[]>` before our parenthesis.  
```TS
 const [todos, setTodos] = useState<Todo[]>(dummyData)
 ```
We will also need a function to pass the `New.tsx` component to update our todo state.  This function needs to accept a `todo` as the only argument.
```TS   
   const newTodo = (todo:Todo) => {
    const allTodos = [...todos, todo] 
    setTodos(allTodos)
  }
```

Head to `List.tsx` and lets get our component set up to accept props.  In order to pass props in a TS environment we need to define <em>a type for our props</em>.
We need to declare an interface:  
List.tsx
```TS
interface IListProps{
    todos:Todo[]
}
```
Finally we need to type our props <em> to match our new interface </em> by declaring our props with our new type
```TS
export default function List(props:IListProps) {/* react magic goes here */}
```
Then in `App.tsx` lets pass the props as normal from our `App.tsx` state
App.tsx
```TS
 <List todos = {todos} />
```

Next, we need to do the same in `New.tsx`.  The only differnece is that our `New` component will recieve a `Function` from `App.tsx` as props rather than `Todo[]` data

App.tsx

```TS
<New addTodo = {newTodo}/>
```
New.tsx

```TS
interface INewProps {
    addTodo:Function
}
export default function New(props:INewProps) { /* react component logic goes here */}
```

Next, we establish state for our `New` component and create a form to connect the user input to that state.  Finally, we will fire the `props.addTodo()` function we recieved from `App.tsx` in our `handleSubmit()` function

```TS
export default function New(props:INewProps) {
const [newText, setNewText] = useState<string>("")
const [newTitle, setNewTitle] = useState<string>("")

const handleText = (e) => {
    let change = e.target.value;
    setNewText(change)
}
const handleTitle = (e) => {
    let change = e.target.value;
    setNewTitle(change)

}

const handleSubmit = (e)) => {
    e.preventDefault()
    let newTodo:Todo = { title:newTitle, text:newText }
    props.addTodo(newTodo)

}
    return (
        <div>
            <form>
                <input type="text" value={newTitle} onChange={handleTitle}></input>
                <textarea value={newText} onChange={handleText}></textarea>
                <button type="submit" onClick = {handleSubmit}>add new</button>
            </form>
             New Text: {newText} New Title: {newTitle}
        </div>
    )
}
```

Now that we have `New.tsx` ready for user input there is one more issue we need to resolve.  `handleText()` and `handleTitle()` both require an argument that we have yet to type!  In order to access attributes such as `e.target.value` in Typescript and React we must specify <em> what type of event  we are interacting with </em>.  There are many TS React event types but the easiest to work with is known as a `React.ChangeEvent`.  Let's update  `handleText()` and `handleTitle()`

New.tsx

```TS
const handleText = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    let change = e.target.value;
    setNewText(change)
}
const handleTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
    let change = e.target.value;
    setNewTitle(change)

}
```

Notice that `ChangeEvent` is a `generic` - meaning it's expecting some sort of information regarding what the argument is.  In this case since we are calling `handleTitle()` on a `HTMLInputElement` we pass that type to the `React.ChangeEvent`.  The same is true iwth `handleText()` but instead we use a `HTMLTextAreaElement`

Lastly, our `onSubmit()` function is called on an `HTMLForm`.  TS knows thata `form` will always be a `form` and therefore does not need any type information passed in.  We do need to define for TS what the event is that triggers the function.  In this case, we use a `React.FormEvent`.

New.tsx

```TS
const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    let newTodo:Todo = { title:newTitle, text:newText }
    props.addTodo(newTodo)

}
```
# Review
In this walkthrough we learned that using TS with React requires some extra steps.  
    * We need to Import `@types/React` in order to use prebuilt Types for our app
    * Our data needs to be defined in an `interface` that we can use
    * Our props need to be defined in our comonents to avoid TS errors for `implicit any types`
    * When interacting with the DOM, we need to pass `React.ChangeEvent` for changes in Input or Text areas and a `React.FormEvent` for form submits.
    * When using `React.ChangeEvent` TS needs us to specify what specific HTML element the `React.ChangeEvent` is wrapping. 
    
Now that we have succesfully tpyed all our props, typed our data, and typed the events and inputs to our state changing functions - TS knows <em> exactly what every single type of variable is at any given time </em> and we now have a simple todo app built with Typescript and understand the basic flow of transitioning to this powerful superset.






