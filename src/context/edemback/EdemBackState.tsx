import React, {useReducer} from "react"
import {EdembackContext} from "./EdembackContext";
import {edemBackReducer} from "./EdemBackReducer";
import {IObject, IState, IUsers} from "../../models";
import axios from "axios";
import {objects} from "../../data/objectsdata";
import {
    GET_ALL_OBJECTS,
    GET_AREND_OBJECT,
    GET_OBJECT_1_FILIAL,
    GET_ONE_OBJECT,
    GET_ALL_USERS,
    CREATE_OBJECT, CREATE_USER, UPDATE_OBJECT, UPDATE_USER, DELETE_OBJECT, DELETE_USER
} from "../typesAction";

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

        dispatch({
            type: GET_ALL_OBJECTS,
            payload: objects
        } )

        // TODO Реализовать получение всех объектов с сервреа (необходим вид данных, которые приходят)
    }

    const getOneObject = async (objectID: number) => {
        const res = await axios.get(`${url}/${objectID}`)

        dispatch({
            type: GET_ONE_OBJECT,
            payload: objectID
        })

        // TODO Реализовать получение одного объекта с сервреа (необходим вид данных, которые приходят)
    }

    const getArendObject = async (status: string) => {
        const res = await  axios.get(`${url}/arend`)

        dispatch({
            type: GET_AREND_OBJECT,
            payload: status
        })

        // TODO Реализвовать пролучение всех арендованных объектов с сервера (необходим вид данных, которые приходят)
    }

    const getObject1Filial = async (officeID: number) => {
        const res = await  axios.get(`${url}/${officeID}`)

        dispatch({
            type: GET_OBJECT_1_FILIAL,
            payload: officeID
        })

        // TODO Реализвовать пролучение всех объектов с одного филиала с сервера (необходим вид данных, которые приходят)
    }

    const getAllUsers = async () => {
        const response = await axios.get<IUsers[]>('https://fakestoreapi.com/users')

        dispatch({
            type: GET_ALL_USERS,
            payload: response.data
        })

        // TODO Реализвовать пролучение всех пользователей с сервера (необходим вид данных, которые приходят)
    }

    const createObject = async (object: IObject) => {
        const res = await axios.post(`${url}/`, object)

        dispatch({
            type: CREATE_OBJECT,
            payload: object
        })

        // TODO Реализвовать добавление на сервер новый объект
    }

    const createUser = async (user: IUsers) => {
        const res = await axios.post(`https://fakestoreapi.com/users`, user)

        dispatch({
            type: CREATE_USER,
            payload: user
        })

        // TODO Реализвовать добавление на сервер нового пользователя
    }

    const updateObject = async (object: IObject) => {
        const res = await axios.post(`${url}`, object) // ? Как правильно писать запрос

        dispatch({
            type: UPDATE_OBJECT,
            payload: object
        })

        // TODO Реализовать обновление информации об объекте
    }

    const updateUser = async (user: IUsers) => {
        const res = await axios.post(`${url}`, user) // ? Как правильно писать запрос

        dispatch({
            type: UPDATE_USER,
            payload: user
        })

        // TODO Реализовать обновление информации о пользователе
    }

    const deleteObject = async (objectID: number) => {
        const res = await axios.delete(`${url}/objects/${objectID}`) // ? Как правильно писать запрос

        dispatch({
            type: DELETE_OBJECT,
            payload: objectID
        })

        // TODO Реализовать удвление объекта
    }

    const deleteUser = async (userID: number) => {
        const res = await axios.delete(`https://fakestoreapi.com/users/${userID}`) // ? Как правильно писать запрос

        dispatch({
            type: DELETE_USER,
            payload: userID
        })

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