import React, {useReducer} from "react"
import {EdembackContext} from "./EdembackContext";
import {edemBackReducer} from "./EdemBackReducer";
import {IObject, IState, IUsers} from "../../models";
import axios from "axios";
import {objectsData} from "../../data/objectsData";
import {
    GET_ALL_OBJECTS,
    GET_AREND_OBJECT,
    GET_OBJECT_1_FILIAL,
    GET_ONE_OBJECT,
    GET_ALL_USERS,
    CREATE_OBJECT,
    CREATE_USER,
    UPDATE_OBJECT,
    UPDATE_USER,
    DELETE_OBJECT,
    DELETE_USER
} from "../typesAction";
import {users} from "../../data/usersdata";
import api from "../../api";

const url = 'ENTER_URL_HERE' // TODO Вставить url

interface IEdemBackState{
    children: React.ReactNode
}

const initialState: IState = {
    users: [],
    objects: [],
    roles: []
}

export const EdemBackState = ({children}: IEdemBackState) => {
    const [state, dispatch] = useReducer(edemBackReducer, initialState)

    const getAllObjects = async () => {
        const response = await api.get(`/Objects`)
        console.log(response.data)

        dispatch({
            type: GET_ALL_OBJECTS,
            payload: response.data
        } )
    }

    const getAllUsers = async () => {
        const response = await api.get(`/Workers`)
        console.log('reducer', response.data)
        dispatch({
            type: GET_ALL_USERS,
            payload: response.data
        })
    }

    const getOneObject = async (objectID: number) => {
        const response = await api.get(`/Object/${objectID}`)
        console.log(response.data)

        dispatch({
            type: GET_ONE_OBJECT,
            payload: response.data
        })
    }

    const deleteObject = async (objectID: number) => {
        const response = await api.delete(`/Object/${objectID}`)
        console.log(response.data)

        dispatch({
            type: DELETE_OBJECT,
            payload: objectID
        })
    }

    const getArendObject = async (status: string) => {
        // const res = await  axios.get(`${url}/arend`)

        dispatch({
            type: GET_AREND_OBJECT,
            payload: status
        })

        // TODO Реализвовать пролучение всех арендованных объектов с сервера (необходим вид данных, которые приходят)
    }

    const getObject1Filial = async (officeID: number) => {
        // const res = await  axios.get(`${url}/${officeID}`)

        dispatch({
            type: GET_OBJECT_1_FILIAL,
            payload: officeID
        })

        // TODO Реализвовать пролучение всех объектов с одного филиала с сервера (необходим вид данных, которые приходят)
    }

    const createObject = async (object: IObject) => {
        //const res = await axios.post(`${url}/`, object)
        const res = objectsData.push(object)

        console.log(objectsData)

        dispatch({
            type: CREATE_OBJECT,
            payload: objectsData[objectsData.length - 1]
        })

        // TODO Реализвовать добавление на сервер новый объект
    }

    const createUser = async (user: IUsers) => {
        // const res = await axios.post(`https://fakestoreapi.com/users`, user)

        const res = users.push(user)

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

    const deleteUser = async (userID: number) => {
        // const res = await axios.delete(`https://fakestoreapi.com/users/${userID}`) // ? Как правильно писать запрос

        const index = users.findIndex(user => user.id === userID)
        if (index !== -1) {
            users.splice(index, 1)
        }

        dispatch({
            type: DELETE_USER,
            payload: userID
        })

        // TODO Реализовать удвление объекта
    }




    return (
        <EdembackContext.Provider value={{
            state,
            dispatch,
            getAllObjects,
            getOneObject,
            getArendObject,
            getObject1Filial,
            getAllUsers,
            createObject,
            createUser,
            updateObject,
            updateUser,
            deleteObject,
            deleteUser,
            // TODO Реализовать интерфейс для передавчи функций
        }}>
            {children}
        </EdembackContext.Provider>
    )
}