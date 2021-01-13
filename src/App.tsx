import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListID1 = v1();
    const todoListID2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
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
        const todoListTasks = tasks[todoListID];
        tasks[todoListID] = todoListTasks.filter(task => task.id !== taskID);
        setTasks({...tasks})
    }

    function changeFilter(filterValue: FilterValueType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = filterValue
            setTodoLists([...todoLists])
        }
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(task => task.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(task => task.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function filterTasksForTodoList(filterValue: FilterValueType, todoListID: string) {
        let tasksForTodoList = tasks[todoListID];
        if (filterValue === 'active') {
            tasksForTodoList = tasksForTodoList.filter(task => !task.isDone)
        } else if (filterValue === "completed") {
            tasksForTodoList = tasksForTodoList.filter(task => task.isDone)
        }
        return tasksForTodoList
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(item => item.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList(todoListTitle: string){
        const todoListID = v1()
        const newTodoList: TodoListType = {
            id: todoListID,
            title: todoListTitle,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks,
            [todoListID]: []
        })
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        const todoList = todoLists.find(item => item.id === todoListID)
        if(todoList){
            todoList.title = title
        }
        setTodoLists([...todoLists])
    }

    return (
        <div className="App">
            
            <AddItemForm addItem={addTodoList}/>

            {
                todoLists.map(item => {
                    let tasksForTodoList = filterTasksForTodoList(item.filter, item.id)
                    return (
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
                    )

                })
            }


        </div>
    );
}

export default App;

