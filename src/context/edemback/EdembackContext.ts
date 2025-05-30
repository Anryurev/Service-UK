import {createContext} from 'react'
import {IBooking, IObject, IOffice, IRequest, IRole, IState, IWorkers} from "../../models";

interface IEdembackContext {
    state: IState
    getAllObjects: () => Promise<void>
    getOneObject: (objectID: number) => Promise<void>
    getArendObject: (status: string) => Promise<void>
    getObject1Filial: (officeID: number) => Promise<void>
    getAllWorkers: () => Promise<void>
    createObject: (object: IObject) => Promise<void>
    createWorker: (worker: IWorkers) => Promise<void>
    updateObject: (object: IObject) => Promise<void>
    updateWorker: (worker: IWorkers) => Promise<void>
    deleteObject: (objectID: number) => Promise<void>
    deleteWorker: (workerId: number) => Promise<void>
    getAllRoles: () => Promise<void>
    deleteRole: (roleID: number) => Promise<void>
    updateRole: (role: IRole) => Promise<void>
    getAllOffices: () => Promise<void>
    deleteOffice: (officeId: number) => Promise<void>
    createOffice: (office: IOffice) => Promise<void>
    updateOffice: (office: IOffice) => Promise<void>
    createRole: (role: IRole) => Promise<void>
    getOneWorker: (workerId: number) => Promise<void>
    getAllBookings: () => Promise<void>
    createBooking: (booking: IBooking) => Promise<void>
    updateBooking: (booking: IBooking) => Promise<void>
    deleteBooking: (bookingID: number) => Promise<void>
    getAllRequests: () => Promise<void>
    createRequest: (request: IRequest) => Promise<void>
    updateRequest: (request: IRequest) => Promise<void>
    deleteRequest: (requestId: number) => Promise<void>
}

export const EdembackContext = createContext<IEdembackContext>({
    state: { workers: [], objects: [], roles: [], offices: [], bookings: [], requests: [],
        worker: {id: 0, id_Role: 0, id_Office: 0, birthday: "", password: "", email: "", name: "", phoneNumber: "", surname: "", fathername: ""},
        role: {role_Id: 0, name: "", salary: 0, levelImportant: 0},
        object: {id: 0, kitchen: false, balcony: false, area: 0, rooms: 0, house: "", street: "", status: "", apartment: "", office_Id: 0},
        office: {office_Id: 0, house: "", street: ""}},
    getAllObjects: async () => {},
    getOneObject: async () => {},
    getArendObject: async () => {},
    getObject1Filial: async () => {},
    getAllWorkers: async () => {},
    createObject: async () => {},
    createWorker: async () => {},
    updateObject: async () => {},
    updateWorker: async () => {},
    deleteObject: async () => {},
    deleteWorker: async () => {},
    getAllRoles: async () => {},
    deleteRole: async () => {},
    updateRole: async () => {},
    getAllOffices: async () => {},
    deleteOffice: async () => {},
    createOffice: async () => {},
    updateOffice: async () => {},
    createRole: async () => {},
    getOneWorker: async () => {},
    getAllBookings: async () => {},
    createBooking: async () => {},
    updateBooking: async () => {},
    deleteBooking: async () => {},
    getAllRequests: async () => {},
    createRequest: async () => {},
    updateRequest: async () => {},
    deleteRequest: async () => {},
})