import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

const REMOVE_TODO_LIST = 'REMOVE_TODO_LIST';
const ADD_TODO_LIST = 'ADD_TODO_LIST';
const CHANGE_TODO_LIST_TITLE = 'CHANGE_TODO_LIST_TITLE';
const CHANGE_TODO_LIST_FILTER = 'CHANGE_TODO_LIST_FILTER';



type RemoveTodoListActionType = {
    type: 'REMOVE_TODO_LIST'
    id: string
}

type AddTodoListActionType = {
    type: 'ADD_TODO_LIST'
    title: string
}

type ChangeTodoListTitleActionType = {
    type: 'CHANGE_TODO_LIST_TITLE'
    title: string
    id: string
}

type ChangeTodoListFilterActionType = {
    type: 'CHANGE_TODO_LIST_FILTER'
    filter: FilterValueType
    id: string
}

type ActionType = RemoveTodoListActionType | AddTodoListActionType
    | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export function todoListReducer(state: Array<TodoListType>, action: ActionType) {
    switch (action.type) {
        case REMOVE_TODO_LIST:
            return state.filter(item => item.id !== action.id);
        case ADD_TODO_LIST:
            const newTodoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            };
            return [...state, newTodoList]
        case CHANGE_TODO_LIST_TITLE:
            const todoLists = state.map(item => {
                if (item.id === action.id) {
                    return {...item, title: action.title}
                } else {
                    return item
                }
            });
            return todoLists
        case CHANGE_TODO_LIST_FILTER: {
            const todoLists = state.map(item => {
                if (item.id === action.id) {
                    return {...item, filter: action.filter}
                } else {
                    return item
                }
            });
            return todoLists
        }
        default:
            return state
    }
}