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







