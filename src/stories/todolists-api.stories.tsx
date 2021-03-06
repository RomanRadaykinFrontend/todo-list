import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todoListApi} from "../todolist-api/todolist-api";

export default {
    title: 'API',
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '5d8331af-03ac-4492-952f-4f4866536655'
    }
}


export const GetTodolists = () => {


    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.getTodoList()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.createTodolist()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '770f158a-6081-4bf2-894f-156fb3f6fcf4';
        todoListApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'dbeaa406-c43d-44af-a8ef-4734f48bede0'
        todoListApi.updateTodolistTitle(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

