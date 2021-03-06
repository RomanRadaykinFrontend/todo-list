import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5d8331af-03ac-4492-952f-4f4866536655'
    }
})

type CommonResponseType<T> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}


export const todoListApi = {
    getTodoList(){
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(){
        return instance.post<CommonResponseType<{item: TodolistType}>>('todo-lists', {title: "newTodolist"})
    },
    deleteTodolist(todolistId: string){
        return instance.delete<CommonResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string){
        return instance.put<CommonResponseType<{}>>(`todo-lists/${todolistId}`, {title: 'REACT>>>>>>>>>'})
    }
}