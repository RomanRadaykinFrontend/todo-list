import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import './App.css';
import {FilterValueType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}


function TodoList(props: PropsType) {

    /*    const [title, setTitle] = useState<string>('');
        const [error, setError] = useState<string | null>(null);*/

    /*    const addTask = () => {
            const taskTitle = title.trim();
            if(taskTitle){
                props.addTask(taskTitle, props.id);
            } else {
                setError('Title is required!')
            }
            setTitle('')
        }*/

    /*    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setError(null)
            setTitle(e.currentTarget.value)
        }

        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') addTask()
        }*/

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }

    const removeTodoList = () => props.removeTodoList(props.id)

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {/*<div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>*/}
            <ul>

                {
                    props.tasks.map(task => {
                            const removeTask = () => {
                                props.removeTask(task.id, props.id)
                            };
                            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(task.id, e.currentTarget.checked, props.id)
                            }
                            const changeTitle = (title: string) => {
                                props.changeTaskTitle(task.id, title, props.id )
                            }
                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                    <input onChange={changeStatus}
                                           type="checkbox"
                                           checked={task.isDone}/>
                                    <EditableSpan changeTitle={changeTitle} title={task.title}/>
                                    {/*<span>{task.title}</span>*/}
                                    <button onClick={(removeTask)}>x</button>
                                </li>
                            )
                        }
                    )
                }

            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-class' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-class' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-class' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList