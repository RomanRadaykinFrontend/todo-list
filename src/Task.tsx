import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    taskId: string
    todoListId: string
    taskIsDone: boolean
    taskTitle: string
    removeTask: (taskID: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}

const Task = React.memo((props: TaskPropsType) => {

    const {removeTask, todoListId, changeStatus, taskId, changeTaskTitle, taskIsDone, taskTitle} = props

    const removeTaskCallback = useCallback(() => {
        removeTask(taskId, todoListId);
    }, [removeTask, taskId, todoListId])

    const changeStatusCallback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(taskId, e.currentTarget.checked, todoListId)
    }, [changeStatus, taskId, todoListId])

    const changeTitleCallback = useCallback((title: string) => {
        changeTaskTitle(taskId, title, todoListId)
    }, [changeTaskTitle, taskId, todoListId])

    return (
        <li key={taskId} className={taskIsDone ? 'is-done' : ''}>
            <Checkbox onChange={changeStatusCallback}
                      color={"primary"}
                      checked={taskIsDone}/>
            <EditableSpan changeTitle={changeTitleCallback}
                          title={taskTitle}/>
            <IconButton onClick={removeTaskCallback}>
                <Delete/>
            </IconButton>
        </li>
    )
})

export default Task