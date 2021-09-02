import React from 'react'
import { Todo } from "../App"

interface IListProps{
    todos:Todo[]
}
export default function List(props:IListProps) {
    return (
        <div>
            Welcome to the list
           { props.todos.map((todo, ind) => {
               return(
                   <div>{todo.title}  {todo.text} </div>
               )
           })}
        </div>
    )
}
