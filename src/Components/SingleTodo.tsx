import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from 'react-beautiful-dnd';

interface ISingleTodoProps {
    index: number,
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({ index, todo, todos, setTodos }: ISingleTodoProps) => {


    // two states: one to track the edit state, the other to track the editText
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);
    // set the focus to the inputText when edit state change
    useEffect(() => {
        inputRef.current?.focus();

    }, [edit]);



    const handleDone = (id: number) => {
        setTodos(
            // if id matches, take that todo's all properties and modify the isDone property 
            todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            ));
    }


    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        // prevent screen refresh
        e.preventDefault();

        // if id matches, take that todo's all properties and modify the todo property
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo)));

        // change the edit state.
        setEdit(false);
    }


    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided, snapshot) => (
                <form
                    onSubmit={(e) => handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
                >

                    {edit ? (
                        <input ref={inputRef} value={editTodo} onChange={(e) => { setEditTodo(e.target.value) }} className='todos__single--text' />
                    ) : (


                        todo.isDone ?
                            // strike the text with <s>
                            (<s className={"todos__single--text"}>{todo.todo}</s>) :
                            (<span className={"todos__single--text"}>{todo.todo}</span>)
                    )}

                    <div>
                        <span
                            className="icon" onClick={() => {
                                // if editMode is not on And todo is not done
                                if (!edit && !todo.isDone) {
                                    // setEdit to true
                                    setEdit(!edit);
                                }
                            }}>
                            <AiFillEdit />
                        </span>

                        <span className="icon" onClick={() => { handleDelete(todo.id) }}>
                            <AiFillDelete />
                        </span>
                        <span className="icon" onClick={() => { handleDone(todo.id) }}>
                            <MdDone />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    )
}

export default SingleTodo