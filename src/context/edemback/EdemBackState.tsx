import React, {useReducer} from "react"
import {EdembackContext} from "./EdembackContext";
import {edemBackReducer} from "./EdemBackReducer";
import {IObject, IState, IUsers} from "../../models";
import axios from "axios";

const url = 'ENTER_URL_HERE' // TODO Вставить url

interface IEdemBackState{
    children: React.ReactNode
}

const initialState: IState = {
    users: [],
    objects: []
}

export const EdemBackState = ({children}: IEdemBackState) => {
    const [state, dispatch] = useReducer(edemBackReducer, initialState)

    const getAllObjects = async () => {
        const res = await axios.get(`${url}`)

        // TODO Реализовать получение всех объектов с сервреа (необходим вид данных, которые приходят)
    }

    const getOneObject = async (objectID: number) => {
        const res = await axios.get(`${url}/${objectID}`)

        // TODO Реализовать получение одного объекта с сервреа (необходим вид данных, которые приходят)
    }

    const getArendObject = async () => {
        const res = await  axios.get(`${url}/arend`)

        // TODO Реализвовать пролучение всех арендованных объектов с сервера (необходим вид данных, которые приходят)
    }

    const getObject1Filial = async (officeID: number) => {
        const res = await  axios.get(`${url}/${officeID}`)

        // TODO Реализвовать пролучение всех объектов с одного филиала с сервера (необходим вид данных, которые приходят)
    }

    const getAllUsers = async () => {
        const res = await  axios.get(`${url}`)

        // TODO Реализвовать пролучение всех пользователей с сервера (необходим вид данных, которые приходят)
    }

    const createObject = async (object: IObject) => {
        const res = await axios.post(`${url}/`, object)

        // TODO Реализвовать добавление на сервер новый объект
    }

    const createUser = async (user: IUsers) => {
        const res = await axios.post(`${url}/`, user)

        // TODO Реализвовать добавление на сервер нового пользователя
    }

    const updateObject = async (object: IObject) => {
        const res = await axios.post(`${url}`, object) // ? Как правильно писать запрос

        // TODO Реализовать обновление информации об объекте
    }

    const updateUser = async (user: IUsers) => {
        const res = await axios.post(`${url}`, user) // ? Как правильно писать запрос

        // TODO Реализовать обновление информации о пользователе
    }

    const deleteObject = async (objectID: number) => {
        const res = await axios.delete(`${url}/objects/${objectID}`) // ? Как правильно писать запрос

        // TODO Реализовать удвление объекта
    }

    const deleteUser = async (userID: number) => {
        const res = await axios.delete(`${url}/users/${userID}`) // ? Как правильно писать запрос

        // TODO Реализовать удвление объекта
    }




    return (
        <EdembackContext.Provider value={{
            state,
            dispatch
            // getAllObjects, getOneObject, getArendObject,
            // getObject1Filial, getAllUsers, createObject,
            // createUser, updateObject, updateUser,
            // deleteObject, deleteUser,
            // TODO Реализовать интерфейс для передавчи функций
        }}>
            {children}
        </EdembackContext.Provider>
    )
}