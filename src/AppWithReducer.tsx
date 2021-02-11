import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer
} from './state/todoListReducer';
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, changeTaskTitleAC} from "./state/tasksReducer";


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

function AppWithReducer() {

    const todoListID1 = v1();
    const todoListID2 = v1();

    const [todoLists, dispatchTodoLists] = useReducer(todoListReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
            [todoListID1]: [
                {id: v1(), title: 'AAA', isDone: false},
                {id: v1(), title: 'BBB', isDone: false},
                {id: v1(), title: 'DDD', isDone: false}
            ],

            [todoListID2]: [
                {id: v1(), title: 'CCC', isDone: false},
                {id: v1(), title: 'III', isDone: false},
                {id: v1(), title: 'LLL', isDone: false}
            ]
        }
    )


    function removeTask(taskID: string, todoListID: string) {
        dispatchToTasks(removeTaskAC(taskID, todoListID))
    }

    function changeFilter(filterValue: FilterValueType, todoListID: string) {
        dispatchTodoLists(changeTodoListFilterAC(todoListID, filterValue));
    }

    function addTask(title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title, todoListID))
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(taskID, isDone, todoListID))
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
    }

    function filterTasksForTodoList(filterValue: FilterValueType, todoListID: string) {
        dispatchTodoLists(changeTodoListFilterAC(todoListID, filterValue))
    }

    function removeTodoList(todoListID: string) {
        let action = removeTodoListAC(todoListID);
        dispatchToTasks(action)
        dispatchTodoLists(action)
    }

    function addTodoList(todoListTitle: string) {
        let action = addTodolistAC(todoListTitle);
        dispatchTodoLists(action)
        dispatchToTasks(action)
    }

    function changeTodoListTitle(title: string, todoListID: string)     {
        dispatchTodoLists(changeTodoListTitleAC(title, todoListID))
    }

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
                            let tasksForTodoList = allTodoListTask;
                            return (
                                <Grid item key={item.id}>
                                    <Paper elevation={10} style={{padding: "30px"}}>
                                        <TodoList
                                            key={item.id}
                                            id={item.id}
                                            tasks={tasksForTodoList}
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

export default AppWithReducer;

