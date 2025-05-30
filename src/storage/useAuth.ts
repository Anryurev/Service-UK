import {useEffect, useState} from "react";
import {IRole, IWorkers} from "../models";
import {getAuthDataFromLocalStorage, saveAuthDataToLocalStorage} from "./loacalStorage";
import api from "../api";

export const useAuth = () => {
    const [worker, setWorker] = useState<IWorkers | null>(null)
    const [role, setRole] = useState<IRole | null>(null)

    useEffect(() => {
        const { worker, role } = getAuthDataFromLocalStorage()
        setWorker(worker)
        setRole(role)
    }, [])

    const updateAuthData = (data: IWorkers ) => {
        saveAuthDataToLocalStorage(data)
        setWorker(data)
    }

    const logoutCookie = async () => {
        await api.post(`/logout`)
    }

    const logout = () => {
        logoutCookie()
        localStorage.clear()
        setWorker(null)
        setRole(null)
    }

    return { worker, role, updateAuthData, logout }
}