import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import './App.css';
import {FilterValueType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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
            <h3 style={{textAlign: "center"}}>
                <EditableSpan title={props.title}
                              changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div style={{paddingTop: "10px"}}>
                <Button variant={props.filter === 'all' ? "outlined" : "contained"}
                        color={"primary"}
                        size={"small"}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={props.filter === 'active' ? "outlined" : "contained"}
                        color={"primary"}
                        size={"small"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? "outlined" : "contained"}
                        color={"primary"}
                        size={"small"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
            <ul style={{listStyleType: "none", paddingLeft: "0"}}>

                {
                    props.tasks.map(task => {
                            const removeTask = () => {
                                props.removeTask(task.id, props.id)
                            };
                            const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(task.id, e.currentTarget.checked, props.id)
                            }
                            const changeTitle = (title: string) => {
                                props.changeTaskTitle(task.id, title, props.id)
                            }
                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                    <Checkbox onChange={changeStatus}
                                              color={"primary"}
                                              checked={task.isDone}/>
                                    <EditableSpan changeTitle={changeTitle}
                                                  title={task.title}/>
                                    <IconButton onClick={removeTask}>
                                        <Delete/>
                                    </IconButton>
                                </li>
                            )
                        }
                    )
                }

            </ul>

        </div>
    )
}

export default TodoList