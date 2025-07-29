import React, {useState} from "react";
import api from "../api";
import {IResponseAuth} from "../models";
import {getAuthDataFromLocalStorage, saveAuthDataToLocalStorage} from "../storage/loacalStorage";
import {useNavigate} from "react-router-dom";

interface IAuthorizationData{
    login: string,
    password: string,
    rememberMe: boolean
}

export function TestAuth() {
    const navigate = useNavigate()

    const handleAuth = async (phone: string, password: string) => {
        const workerAuth: IAuthorizationData = {
            login: phone,
            password: password.trim(),
            rememberMe: true
        }
        console.log('workerAuth', workerAuth)
        const response = await api.post<IResponseAuth>(`/Auth`, workerAuth)
        saveAuthDataToLocalStorage(response.data)
        const {worker, role} = getAuthDataFromLocalStorage()
        if (worker && role) {
            switch (role?.levelImportant) {
                case 1:
                    localStorage.setItem('main_page', "/home")
                    navigate('/home')
                    break
                case 2:
                    localStorage.setItem('main_page', "/objects")
                    navigate('/objects')
                    break
                case 3:
                    localStorage.setItem('main_page', `${role?.name === "Оператор"? "/home" : role?.name === "Администратор"? "/calendar" : "/execut"}`)
                    navigate(`${role?.name === "Оператор"? "/home" : role?.name === "Администратор"? "/calendar" : "/execut"}`)
                    break
                case 4:
                    localStorage.setItem('main_page', "/execut")
                    navigate('/execut')
                    break
                default:
                    localStorage.setItem('main_page', "/execut")
                    navigate('/execut')
                    break
            }
        } else {
            alert('Неверный логин или пароль');
        }
    }

    return (
        <>
            <div className="container">
                <div className="row mb-3 mt-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            handleAuth("+79001234567", "Qwerty123!")
                        }}
                    >Директор</button>
                </div>
                <div className="row mb-3 mt-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            handleAuth("+79910123456", "Plm9o0p-")
                        }}
                    >Менеджер</button>
                </div>
                <div className="row mb-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            handleAuth("+79405678901", "1qaz2wsx!")
                        }}
                    >Администратор</button>
                </div>
                <div className="row mb-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            handleAuth("+79304567890", "PassWord1#")
                        }}
                    >Оператор</button>
                </div>
                <div className="row mb-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            handleAuth("+79607890123", "Lkjhgfdsa2@")
                        }}
                    >Электрик</button>
                </div>
                <div className="row mb-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            handleAuth("+79708901234", "3Edc4rfv#")
                        }}
                    >Сантехник</button>
                </div>
                <div className="row mb-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            handleAuth("+79506789012", "Rtyu4567&")
                        }}
                    >Уборщица</button>
                </div>
                <div className="row mb-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            handleAuth("+79203456789 ", "Zxcvbn789@")
                        }}
                    >Завхоз</button>
                </div>
            </div>
        </>

    )
}