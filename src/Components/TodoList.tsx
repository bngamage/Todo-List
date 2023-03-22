import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import "./styles.css"

interface TodoListProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos, completedTodos, setCompletedTodos }: TodoListProps) => {
    return (
        <div className="container">
            {/* droppable id use to identify dropable zone uniquly */}
            <Droppable droppableId="TodosList">
                {/*  the ui needs to be inside call back function
                provided: this should provide to the parent element/ div 
                so react dnd can control this as droppable zone.
                */}
                {(provided, snapshot) => (
                    <div
                        className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos__heading">Active Tasks</span>
                        {todos?.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                todos={todos}
                                todo={todo}
                                key={todo.id}
                                setTodos={setTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="TodosRemove">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`todos  ${snapshot.isDraggingOver ? "dragcomplete" : "remove"
                            }`}
                    >
                        <span className="todos__heading">Completed Tasks</span>
                        {completedTodos?.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                todos={completedTodos}
                                todo={todo}
                                key={todo.id}
                                setTodos={setCompletedTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>

    )


}

export default TodoList;


