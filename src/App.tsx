import React, { useState } from 'react';
import New from "./components/New"
import List from "./components/List"
import './App.css';

export interface Todo {
  title:string;
  text:string;
}
const data:Todo[] = [
  {title:"one", text:"hello"},
  {title:"two", text:"hello2"},
  {title:"three", text:"hello3"},
]
function App() {
  const [todos, setTodos] = useState<Todo[]>(data)
  
  const newTodo = (todo:Todo) => {
    const current = [...todos, todo]
    setTodos(current)
  }
  return (
    <div className="App">
      <List todos = {todos}/>
      <New newTodo = {newTodo}/>
    </div>
  );
}

export default App;
