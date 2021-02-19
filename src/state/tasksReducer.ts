import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todoListReducer";



type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    taskID: string
    todoListID: string
}

type AddTaskActionType = {
    type: 'ADD_TASK'
    title: string
    todoListID: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    taskID: string
    isDone: boolean
    todoListID: string
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    taskID: string
    title: string
    todoListID: string
}

type ActionType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodoListActionType | RemoveTodoListActionType

let initialState: TaskStateType = {};

export function tasksReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case 'REMOVE_TASK':
            let copyState = {...state}
            copyState[action.todoListID] = copyState[action.todoListID].filter(task => task.id !== action.taskID);
            return copyState
        case 'ADD_TASK': {
            let copyState = {...state};
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            };
            copyState[action.todoListID] = [newTask, ...state[action.todoListID]]
            return copyState
        }
        case 'CHANGE_TASK_STATUS':{
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => {
                    if(task.id !== action.taskID){
                        return task
                    } else {
                        return {...task, isDone: action.isDone}
                    }
                })
            }
        }
        case 'CHANGE_TASK_TITLE': {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => {
                    if(task.id !== action.taskID){
                        return task
                    } else {
                        return {...task, title: action.title}
                    }
                })
            }
        }
        case 'ADD_TODO_LIST': {
            return {
                ...state,
                [action.todoListID]: []
            }
        }
        case 'REMOVE_TODO_LIST': {
            let copyState = {...state};
            delete copyState[action.id];
            return copyState
        }

        default:
            return state
    }
}


export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', todoListID, taskID}
}

export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {type: 'ADD_TASK', title, todoListID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE_TASK_STATUS', taskID, isDone, todoListID}
}

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', taskID, title, todoListID}
}