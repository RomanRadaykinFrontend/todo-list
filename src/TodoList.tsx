import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import './App.css';
import {FilterValueType, TaskType} from "./App";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeFilter: (filterValue: FilterValueType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    filter: FilterValueType
}


function TodoList(props: PropsType) {

    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        const taskTitle = title.trim();
        if(taskTitle){
            props.addTask(taskTitle, props.id);
        } else {
            setError('Title is required!')
        }
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask()
    }

    const onAllClickHandler = () => {
        props.changeFilter('all',  props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }

    const removeTodoList = () => props.removeTodoList(props.id)

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>X</button></h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>

                {
                    props.tasks.map(task => {
                            const removeTask = () => {props.removeTask(task.id, props.id)};
                            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {props.changeStatus(task.id, e.currentTarget.checked, props.id)}
                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                    <input onChange={changeStatus}
                                           type="checkbox"
                                           checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <button onClick={(removeTask)}>x</button>
                                </li>
                            )
                        }
                    )
                }

            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-class' : ''}
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-class' : ''}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-class' : ''}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList