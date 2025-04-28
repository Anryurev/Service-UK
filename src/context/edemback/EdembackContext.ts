import {createContext} from 'react'
import {IBooking, IObject, IOffice, IRequest, IRole, IState, IUsers} from "../../models";

interface IEdembackContext {
    state: IState
    getAllObjects: () => Promise<void>
    getOneObject: (objectID: number) => Promise<void>
    getArendObject: (status: string) => Promise<void>
    getObject1Filial: (officeID: number) => Promise<void>
    getAllUsers: () => Promise<void>
    createObject: (object: IObject) => Promise<void>
    createUser: (user: IUsers) => Promise<void>
    updateObject: (object: IObject) => Promise<void>
    updateUser: (user: IUsers) => Promise<void>
    deleteObject: (objectID: number) => Promise<void>
    deleteUser: (userID: number) => Promise<void>
    getAllRoles: () => Promise<void>
    deleteRole: (roleID: number) => Promise<void>
    getAllOffices: () => Promise<void>
    deleteOffice: (officeId: number) => Promise<void>
    createOffice: (office: IOffice) => Promise<void>
    createRole: (role: IRole) => Promise<void>
    getOneUser: (userId: number) => Promise<void>
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
    state: { users: [], objects: [], roles: [], offices: [], bookings: [], requests: [],
        user: {id: 0, id_Role: 0, id_Office: 0, birthday: "", password: "", email: "", name: "", phoneNumber: "", surname: "", fathername: ""},
        role: {role_Id: 0, name: "", salary: 0},
        object: {id: 0, kitchen: false, balcony: false, area: 0, rooms: 0, house: "", street: "", status: "", apartment: "", office_Id: 0},
        office: {office_Id: 0, house: "", street: ""}},
    getAllObjects: async () => {},
    getOneObject: async () => {},
    getArendObject: async () => {},
    getObject1Filial: async () => {},
    getAllUsers: async () => {},
    createObject: async () => {},
    createUser: async () => {},
    updateObject: async () => {},
    updateUser: async () => {},
    deleteObject: async () => {},
    deleteUser: async () => {},
    getAllRoles: async () => {},
    deleteRole: async () => {},
    getAllOffices: async () => {},
    deleteOffice: async () => {},
    createOffice: async () => {},
    createRole: async () => {},
    getOneUser: async () => {},
    getAllBookings: async () => {},
    createBooking: async () => {},
    updateBooking: async () => {},
    deleteBooking: async () => {},
    getAllRequests: async () => {},
    createRequest: async () => {},
    updateRequest: async () => {},
    deleteRequest: async () => {},
})