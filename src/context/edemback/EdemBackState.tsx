import React, {useReducer} from "react"
import {EdembackContext} from "./EdembackContext";
import {edemBackReducer} from "./EdemBackReducer";
import {IBooking, IObject, IOffice, IRequest, IRole, IState, IUsers} from "../../models";
import axios from "axios";
import {objectsData} from "../../data/objectsData";
import {
    GET_ALL_OBJECTS,
    GET_AREND_OBJECT,
    GET_OBJECT_1_FILIAL,
    GET_ONE_OBJECT,
    GET_ALL_Users,
    CREATE_OBJECT,
    CREATE_USER,
    UPDATE_OBJECT,
    UPDATE_USER,
    DELETE_OBJECT,
    DELETE_USER,
    GET_ALL_ROLES,
    DELETE_ROLE,
    GET_ALL_OFFICES,
    DELETE_OFFICE,
    CREATE_OFFICE,
    CREATE_ROLE,
    GET_ONE_USER,
    DELETE_BOOKING,
    UPDATE_BOOKING,
    CREATE_BOOKING,
    GET_ALL_BOOKINGS,
    GET_REQUEST,
    CREATE_REQUEST,
    UPDATE_REQUEST,
    DELETE_REQUEST
} from "../typesAction";
import api from "../../api";

interface IEdemBackState{
    children: React.ReactNode
}

const initialState: IState = {
    users: [],
    objects: [],
    roles: [],
    offices: [],
    bookings: [],
    requests: [],
    user: {id: 0, id_Role: 0, id_Office: 0, birthday: "", password: "", email: "", name: "", phoneNumber: "", surname: "", fathername: ""},
    role: {role_Id: 0, name: "", salary: 0},
    object: {id: 0, kitchen: false, balcony: false, area: 0, rooms: 0, house: "", street: "", status: "", apartment: "", office_Id: 0},
    office: {office_Id: 0, house: "", street: ""}
}

export const EdemBackState = ({children}: IEdemBackState) => {
    const [state, dispatch] = useReducer(edemBackReducer, initialState)

    // Objects
    const getAllObjects = async () => {
        const response = await api.get(`/Objects`)
        console.log('Get all objects', response.data)

        dispatch({
            type: GET_ALL_OBJECTS,
            payload: response.data
        } )
    }
    const getOneObject = async (objectID: number) => {
        const response = await api.get(`/Object/${objectID}`)
        console.log('Get one object', response.data)

        dispatch({
            type: GET_ONE_OBJECT,
            payload: response.data
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
        const response = await api.post(`/Object`, object)
        console.log('response', response.data)

        dispatch({
            type: CREATE_OBJECT,
            payload: object
        })
    }
    const deleteObject = async (objectID: number) => {
        const response = await api.delete(`/Object/${objectID}`)
        console.log('Delete object: ', response.data)

        dispatch({
            type: DELETE_OBJECT,
            payload: objectID
        })
    }
    const updateObject = async (object: IObject) => {
        const response = await api.put(`/UpdateObject`, object)

        dispatch({
            type: UPDATE_OBJECT,
            payload: object
        })
    }




    // Users
    const getAllUsers = async () => {
        const response = await api.get(`/Workers`)
        console.log('Get all Users: ', response.data)
        dispatch({
            type: GET_ALL_Users,
            payload: response.data
        })
    }
    const getOneUser = async (userId: number) => {
        const response = await api.get(`/Worker/${userId}`)
        console.log('Get one user', response.data)

        dispatch({
            type: GET_ONE_USER,
            payload: response.data
        })
    }
    const createUser = async (user: IUsers) => {
        const response = await api.post(`/Worker`, user)
        console.log(response.data)

        dispatch({
            type: CREATE_USER,
            payload: response.data
        })
    }
    const updateUser = async (user: IUsers) => {
        const response = await api.put(`/UpdateWorker`, user)

        dispatch({
            type: UPDATE_USER,
            payload: user
        })
    }
    const deleteUser = async (userID: number) => {
        const response = await api.delete(`/Worker/${userID}`)

        dispatch({
            type: DELETE_USER,
            payload: userID
        })
    }


    // Roles
    const getAllRoles = async () => {
        const response = await api.get(`/Roles`)
        console.log('Get all roles: ', response.data)

        dispatch({
            type: GET_ALL_ROLES,
            payload: response.data
        })
    }
    const deleteRole = async (roleId: number) => {
        const respone = await  api.delete(`/Role/${roleId}`)

        dispatch({
            type: DELETE_ROLE,
            payload: roleId
        })
    }
    const createRole = async (role: IRole) => {
        const response = await api.post(`/Role`, role)

        dispatch({
            type: CREATE_ROLE,
            payload: role
        })
    }




    // Offices
    const getAllOffices = async () => {
        const response = await api.get(`/Offices`)
        console.log(response.data)

        dispatch({
            type: GET_ALL_OFFICES,
            payload: response.data
        })
    }
    const createOffice = async (office: IOffice) => {
        const response = await api.post(`/Office`, office)

        dispatch({
            type: CREATE_OFFICE,
            payload: office
        })
    }
    // const updateOffice = async (office: IOffice) => {
    //     const response = await api.put(`/UpdateWorker`, user)
    //
    //     dispatch({
    //         type: UPDATE_USER,
    //         payload: user
    //     })
    // }
    const deleteOffice = async (officeId: number) => {
        const response = await api.delete(`/Office/${officeId}`)

        dispatch({
            type: DELETE_OFFICE,
            payload: officeId
        })
    }




    // Bookings
    const getAllBookings = async () => {
        const response = await api.get(`/Bookings`)
        console.log('Get all booking: ', response.data)
        dispatch({
            type: GET_ALL_BOOKINGS,
            payload: response.data
        })
    }
    // const getOneBooking = async (userId: number) => {
    //     const response = await api.get(`/Worker/${userId}`)
    //     console.log('Get one user', response.data)
    //
    //     dispatch({
    //         type: GET_ONE_USER,
    //         payload: response.data
    //     })
    // }
    const createBooking = async (booking: IBooking) => {
        console.log('booking in state', booking)
        const response = await api.post(`/Booking`, booking)
        console.log('CreateBooking', response.data)

        dispatch({
            type: CREATE_BOOKING,
            payload: response.data
        })
    }
    const updateBooking = async (booking: IBooking) => {
        const response = await api.put(`/UpdateBooking`, booking)

        dispatch({
            type: UPDATE_BOOKING,
            payload: booking
        })
    }
    const deleteBooking = async (bookingId: number) => {
        const response = await api.delete(`/Booking/${bookingId}`)

        dispatch({
            type: DELETE_BOOKING,
            payload: bookingId
        })
    }


    // Requests
    const getAllRequests = async () => {
        const response = await api.get(`/Requests`)
        console.log('Get all requests: ', response.data)
        dispatch({
            type: GET_REQUEST,
            payload: response.data
        })
    }
    const createRequest = async (request: IRequest) => {
        console.log('request in state', request)
        const response = await api.post(`/Request`, request)

        dispatch({
            type: CREATE_REQUEST,
            payload: response.data
        })
    }
    const updateRequest = async (request: IRequest) => {
        const response = await api.put(`/UpdateRequest`, request)

        dispatch({
            type: UPDATE_REQUEST,
            payload: request
        })
    }
    const deleteRequest = async (requestId: number) => {
        const response = await api.delete(`/Request/${requestId}`)

        dispatch({
            type: DELETE_REQUEST,
            payload: requestId
        })
    }


    return (
        <EdembackContext.Provider value={{
            state,
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
            getAllRoles,
            deleteRole,
            getAllOffices,
            deleteOffice,
            createOffice,
            createRole,
            getOneUser,
            getAllBookings,
            createBooking,
            updateBooking,
            deleteBooking,
            getAllRequests,
            createRequest,
            updateRequest,
            deleteRequest,
        }}>
            {children}
        </EdembackContext.Provider>
    )
}