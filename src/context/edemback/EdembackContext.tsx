import {createContext, Dispatch} from 'react'
import {Action, IObject, IState, IUsers} from "../../models";

interface IEdembackContext {
    state: IState
    dispatch: Dispatch<Action>
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
}

export const EdembackContext = createContext<IEdembackContext>({
    state: { users: [], objects: [] },
    dispatch: () => {},
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
})