import React, {useCallback} from 'react';
import './App.css';
import {FilterValueType, TaskType} from "./App";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {AddItemForm} from './AddItemForm';
import Task from "./Task";


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


const TodoList = React.memo((props: PropsType) => {

    const {
        addTask,
        id,
        changeFilter,
        removeTodoList,
        changeTodoListTitle,
        tasks,
        filter,
        title,
        changeStatus,
        removeTask,
        changeTaskTitle
    } = props;

    let tasksForTodoList = tasks.filter(item => {
        if (filter === 'completed') {
            return item.isDone

        } else if (filter === 'active') {
            return !item.isDone
        } else {
            return item
        }
    })


    const addTaskCallback = useCallback((title: string) => {
        addTask(title, id)
    }, [addTask, id])

    const onAllClickHandlerCallback = useCallback(() => {
        changeFilter('all', id)
    }, [changeFilter, id])

    const onActiveClickHandlerCallback = useCallback(() => {
        changeFilter('active', id)
    }, [changeFilter, id])

    const onCompletedClickHandlerCallback = useCallback(() => {
        changeFilter('completed', id)
    }, [changeFilter, id])

    const removeTodoListCallback = useCallback(() => removeTodoList(id), [removeTodoList, id])

    const changeTodoListTitleCallback = useCallback((newTitle: string) => {
        changeTodoListTitle(newTitle, id)
    }, [changeTodoListTitle, id])

    return (
        <div>
            <h3 style={{textAlign: "center"}}>
                <EditableSpan title={title}
                              changeTitle={changeTodoListTitleCallback}/>
                <IconButton onClick={removeTodoListCallback}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCallback}/>
            <div style={{paddingTop: "10px"}}>
                <Button variant={filter === 'all' ? "outlined" : "contained"}
                        color={"primary"}
                        size={"small"}
                        onClick={onAllClickHandlerCallback}>All
                </Button>
                <Button variant={filter === 'active' ? "outlined" : "contained"}
                        color={"primary"}
                        size={"small"}
                        onClick={onActiveClickHandlerCallback}>Active
                </Button>
                <Button variant={filter === 'completed' ? "outlined" : "contained"}
                        color={"primary"}
                        size={"small"}
                        onClick={onCompletedClickHandlerCallback}>Completed
                </Button>
            </div>
            <ul style={{listStyleType: "none", paddingLeft: "0"}}>

                {
                    tasksForTodoList.map(task => {

                            return <Task key={task.id} taskId={task.id} taskIsDone={task.isDone} taskTitle={task.title}
                                         todoListId={id}
                                         changeStatus={changeStatus} removeTask={removeTask}
                                         changeTaskTitle={changeTaskTitle}/>
                        }
                    )
                }

            </ul>

        </div>
    )
})

export default TodoList