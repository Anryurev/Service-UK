import {useEffect, useState} from "react";
import {IRole, IWorkers} from "../models";
import {getAuthDataFromLocalStorage, saveAuthDataToLocalStorage} from "./loacalStorage";

export const useAuth = () => {
    const [worker, setWorker] = useState<IWorkers | null>(null)
    const [roles, setRoles] = useState<IRole[] | null>(null)

    useEffect(() => {
        const { worker, roles } = getAuthDataFromLocalStorage()
        setWorker(worker)
        setRoles(roles)
    }, [])

    const updateAuthData = (data: { Worker: IWorkers; Roles?: IRole[]} ) => {
        saveAuthDataToLocalStorage(data)
        setWorker(data.Worker)
        setRoles(data.Roles || null)
    }

    const logout = () => {
        localStorage.removeItem('worker')
        localStorage.removeItem('roles')
        localStorage.removeItem('auth_time')
        setWorker(null)
        setRoles(null)
    }

    return { worker, roles, updateAuthData, logout }
}