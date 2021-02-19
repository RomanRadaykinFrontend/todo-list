import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListActionType = {
    type: 'REMOVE_TODO_LIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD_TODO_LIST'
    todoListID: string
    title: string
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE_TODO_LIST_TITLE'
    title: string
    id: string
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE_TODO_LIST_FILTER'
    filter: FilterValueType
    id: string
}

export type ActionType = RemoveTodoListActionType | AddTodoListActionType
    | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

let initialState: Array<TodoListType> = [];

export function todoListReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case 'REMOVE_TODO_LIST':
            return state.filter(item => item.id !== action.id);
        case 'ADD_TODO_LIST':
            const newTodoList: TodoListType = {
                id: action.todoListID,
                title: action.title,
                filter: 'all'
            };
            return [...state, newTodoList];
        case 'CHANGE_TODO_LIST_TITLE': {
            const todoList1 = state.map(item => {
                if (item.id === action.id) {
                    return {...item, title: action.title}
                } else {
                    return item
                }
            });
            return todoList1
        }
        case 'CHANGE_TODO_LIST_FILTER': {
            const todoList2 = state.map(item => {

                if (item.id === action.id) {
                    return {...item, filter: action.filter}
                } else {
                    return item
                }
            });
            return todoList2
        }
        default:
            return state
    }
}

export const addTodolistAC = (todoListTitle: string): AddTodoListActionType => {
    return {
        type: 'ADD_TODO_LIST',
        title: todoListTitle,
        todoListID: v1()
    }
};
export const removeTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {
        type: 'REMOVE_TODO_LIST',
        id: todoListID
    }
};
export const changeTodoListTitleAC = (todoListTitle: string, todoListID: string): ChangeTodoListTitleActionType => {
    return {
        type: 'CHANGE_TODO_LIST_TITLE',
        title: todoListTitle,
        id: todoListID
    }
};
export const changeTodoListFilterAC = (todoListID: string, filterValue: FilterValueType): ChangeTodoListFilterActionType => {
    return {
        type: 'CHANGE_TODO_LIST_FILTER',
        id: todoListID,
        filter: filterValue
    }
};