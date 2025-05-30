import React, {useReducer} from "react"
import {EdembackContext} from "./EdembackContext";
import {edemBackReducer} from "./EdemBackReducer";
import {IBooking, IObject, IOffice, IRequest, IRole, IState, IWorkers} from "../../models";
import {
    GET_ALL_OBJECTS,
    GET_AREND_OBJECT,
    GET_OBJECT_1_FILIAL,
    GET_ONE_OBJECT,
    GET_ALL_WORKERS,
    CREATE_OBJECT,
    CREATE_WORKER,
    UPDATE_OBJECT,
    UPDATE_WORKER,
    DELETE_OBJECT,
    DELETE_WORKER,
    GET_ALL_ROLES,
    DELETE_ROLE,
    GET_ALL_OFFICES,
    DELETE_OFFICE,
    CREATE_OFFICE,
    CREATE_ROLE,
    GET_ONE_WORKER,
    DELETE_BOOKING,
    UPDATE_BOOKING,
    CREATE_BOOKING,
    GET_ALL_BOOKINGS,
    GET_REQUEST,
    CREATE_REQUEST,
    UPDATE_REQUEST,
    DELETE_REQUEST, UPDATE_ROLE, UPDATE_OFFICE
} from "../typesAction";
import api from "../../api";

interface IEdemBackState{
    children: React.ReactNode
}

const initialState: IState = {
    workers: [],
    objects: [],
    roles: [],
    offices: [],
    bookings: [],
    requests: [],
    worker: {id: 0, id_Role: 0, id_Office: 0, birthday: "", password: "", email: "", name: "", phoneNumber: "", surname: "", fathername: ""},
    role: {role_Id: 0, name: "", salary: 0, levelImportant: 0},
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

        dispatch({
            type: CREATE_OBJECT,
            payload: object
        })
    }
    const deleteObject = async (objectID: number) => {
        const response = await api.delete(`/Object/${objectID}`)

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




    // Workers
    const getAllWorkers = async () => {
        const response = await api.get(`/Workers`)
        console.log('Get all Workers: ', response.data)
        dispatch({
            type: GET_ALL_WORKERS,
            payload: response.data
        })
    }
    const getOneWorker = async (workerId: number) => {
        const response = await api.get(`/Worker/${workerId}`)

        dispatch({
            type: GET_ONE_WORKER,
            payload: response.data
        })
    }
    const createWorker = async (worker: IWorkers) => {
        const response = await api.post(`/Worker`, worker)

        dispatch({
            type: CREATE_WORKER,
            payload: response.data
        })
    }
    const updateWorker = async (worker: IWorkers) => {
        const response = await api.put(`/UpdateWorker`, worker)

        dispatch({
            type: UPDATE_WORKER,
            payload: worker
        })
    }
    const deleteWorker = async (workerID: number) => {
        const response = await api.delete(`/Worker/${workerID}`)

        dispatch({
            type: DELETE_WORKER,
            payload: workerID
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
    const updateRole = async (role: IRole) => {
        const response = await api.put(`/UpdateRole`, role)

        dispatch({
            type: UPDATE_ROLE,
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
    const updateOffice = async (office: IOffice) => {
        const response = await api.put(`/UpdateWorker`, office)

        dispatch({
            type: UPDATE_OFFICE,
            payload: office
        })
    }
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
    // const getOneBooking = async (bookingId: number) => {
    //     const response = await api.get(`/Worker/${bookingId}`)
    //     console.log('Get one booking', response.data)
    //
    //     dispatch({
    //         type: GET_ONE_BOOKING,
    //         payload: response.data
    //     })
    // }
    const createBooking = async (booking: IBooking) => {
        console.log('booking in state create', booking)
        const response = await api.post(`/Booking`, booking)
        console.log('CreateBooking', response.data)

        dispatch({
            type: CREATE_BOOKING,
            payload: response.data
        })
    }
    const updateBooking = async (booking: IBooking) => {
        console.log('booking in state update', booking)
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
            getAllWorkers,
            createObject,
            createWorker,
            updateObject,
            updateWorker,
            deleteObject,
            deleteWorker,
            getAllRoles,
            deleteRole,
            updateRole,
            getAllOffices,
            deleteOffice,
            createOffice,
            updateOffice,
            createRole,
            getOneWorker,
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