import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from './state/todoListReducer';
import {addTaskAC, changeTaskStatusAC, removeTaskAC, changeTaskTitleAC} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from './state/store';
import {AddItemForm} from './AddItemForm';


//Типы
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);

    const dispatch = useDispatch();


    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }, [dispatch])

    const changeFilter = useCallback((filterValue: FilterValueType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(todoListID, filterValue));
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch])

    const changeStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }, [dispatch])


    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }, [dispatch])

    const addTodoList = useCallback((todoListTitle: string) => {
        dispatch(addTodolistAC(todoListTitle))
    }, [dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }, [dispatch])

    return (
        <div className="App">

            <AppBar position={"static"}>
                <Toolbar style={{display: "flex", justifyContent: "space-between"}}>

                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>

                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Typography variant={"h6"} style={{margin: "10px"}}>
                            News
                        </Typography>
                        <Typography variant={"h6"} style={{margin: "10px"}}>
                            About
                        </Typography>
                    </div>

                    <Button color={"inherit"}>Login</Button>

                </Toolbar>
            </AppBar>


            <Container fixed>

                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={3}>
                    {
                        todoLists.map(item => {
                            let allTodoListTask = tasks[item.id];
                            return (
                                <Grid item key={item.id}>
                                    <Paper elevation={10} style={{padding: "30px"}}>
                                        <TodoList
                                            key={item.id}
                                            id={item.id}
                                            tasks={allTodoListTask}
                                            title={item.title}
                                            removeTodoList={removeTodoList}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            filter={item.filter}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )

                        })
                    }
                </Grid>

            </Container>


        </div>
    )
        ;
}

export default AppWithRedux;

