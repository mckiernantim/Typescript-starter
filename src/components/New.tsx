import React, {useState} from 'react'
import { Todo } from "../App"
interface INewProps {
    newTodo:Function
}
export default function New(props:INewProps) {
    const [newTitle, setNewTitle] = useState<string>("")
    const [newText, setNewText] = useState<string>("")

    const titleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{ 
        let updatedTitle = e.target.value;
        setNewTitle(updatedTitle)
    }
    const textChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        let updatedText = e.target.value;
        setNewText(updatedText)
    }
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        let todoToCreate:Todo ={
            title:newTitle,
            text:newText
        } 
        props.newTodo(todoToCreate)
    }
    return (
        <div>
            new works
            <form>
                <label>
                    <input type="text" value={newTitle} onChange={titleChange}></input>
                </label>
                <label>
                    <textarea value={newText} onChange={textChange}></textarea>
                </label>
                <button type="submit" onSubmit={handleSubmit}>add todo</button>
            </form>
            Title: {newTitle}  Text: {newText}
        </div>
    )
}
