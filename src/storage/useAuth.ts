import {useEffect, useState} from "react";
import {IResponseAuth, IRole, IWorkers} from "../models";
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

    const updateAuthData = (data: IResponseAuth ) => {
        saveAuthDataToLocalStorage(data)
        setWorker(data.worker)
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