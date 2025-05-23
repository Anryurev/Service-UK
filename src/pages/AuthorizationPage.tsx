import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {WorkerContext} from "../context/workerContext/WorkerContext";
import {EdembackContext} from "../context/edemback/EdembackContext";
import api from "../api";
import {IResponseAuth, IRole, IWorkers} from "../models";
import {getAuthDataFromLocalStorage, saveAuthDataToLocalStorage} from "../storage/loacalStorage";

interface IAuthorizationData{
    login: string,
    password: string
}

export function AuthorizationPage(){
    // const [username, setUsername] = useState('');
    const navigate = useNavigate()
    const [authData, setAuthData] = useState<IAuthorizationData>()
    const [error, setError] = useState(false)
    const workerContext = useContext(WorkerContext)
    const [phone, setPhone] = useState('+7')
    const [password, setPassword] = useState('')
    const [eye, setEye] = useState(false)

    const formatPhone = (value: string) => {
        const numbers = value.replace(/\D/g, '').substring(1)
        let formatted = '+7'

        if (numbers.length > 0) {
            formatted += ` (${numbers.substring(0, 3)}`
        }
        if (numbers.length > 3) {
            formatted += `) ${numbers.substring(3, 6)}`
        }
        if (numbers.length > 6) {
            formatted += `-${numbers.substring(6, 8)}`
        }
        if (numbers.length > 8) {
            formatted += `-${numbers.substring(8, 10)}`
        }

        return formatted
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        if (input.startsWith('+7') || input === '+') {
            setPhone(formatPhone(input));
            console.log('format phone', phone)
        }
    }

    const cleanPhoneNumber = (formattedPhone: string): string => {
        // Удаляем всё, кроме цифр и +
        return formattedPhone.replace(/[^\d+]/g, '')
    }

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        if(phone && password){
            try{
                const workerAuth: IAuthorizationData = {
                    login: cleanPhoneNumber(phone),
                    password: password
                }
                const response = await api.post<IResponseAuth>(`/Auth`, workerAuth)
                saveAuthDataToLocalStorage(response.data)
                const {worker, roles} = getAuthDataFromLocalStorage()
                console.log('found', worker)

                if (worker) {
                    console.log('role', worker.id_Role)
                    workerContext?.setWorker(worker)
                    switch (worker.id_Role) {
                        case 1:
                            navigate('/home')
                            break
                        case 2:
                            navigate('/home')
                            break
                        case 3:
                            navigate('/execut')
                            break
                        case 4:
                            navigate('/home')
                            break
                        case 5:
                            navigate('/calendar')
                            break
                        case 6:
                            navigate('/execut')
                            break
                        case 7:
                            navigate('/execut')
                            break
                    }
                } else {
                    alert('Неверный логин или пароль');
                }
            } catch (e){
                setError(true)
            }
        }
    }

    return (
        <>
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <form onSubmit={submitHandler} className="p-4 rounded-3 shadow bg-white" style={{width: "100%", maxWidth: "450px"}}>

                    {/* Заголовок */}
                    <div className="text-center mb-4">
                        <h1 className="fw-bold text-primary">Авторизация</h1>
                        <p className="text-muted">Введите ваши данные для входа</p>
                    </div>

                    {/* Поле телефона с иконкой */}
                    <div className="input-group mb-3">
                        <span className="input-group-text bg-transparent border-end-0">
                            <i className="bi bi-telephone text-primary"></i>
                        </span>
                        <input
                            type="tel"
                            value={phone}
                            onChange={handleChange}
                            placeholder="+7 (123) 456-78-90"
                            className="form-control py-2 border-start-0"
                        />
                    </div>

                    {/* Поле пароля с иконкой */}
                    <div className="input-group mb-3">
                        <span className="input-group-text bg-transparent border-end-0">
                            <i className="bi bi-lock text-primary"></i>
                        </span>
                        <input
                            type={eye? "text" : "password"}
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control py-2 border-start-0"
                        />
                        <div className="form-control-lg">
                            { eye?
                                <i className="bi bi-eye" onClick={() => setEye(false)}></i>
                                : <i className="bi bi-eye-slash"  onClick={() => setEye(true)}></i>}
                        </div>
                    </div>

                    {/* Сообщение об ошибке */}
                    {error && (
                        <div className="alert alert-danger animate__animated animate__headShake mb-3">
                            <i className="bi bi-exclamation-circle me-2"></i>
                            Неверный телефон или пароль
                        </div>
                    )}

                    {/* Запомнить меня и забыли пароль */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="remember"
                                className="form-check-input"
                            />
                            <label htmlFor="remember" className="form-check-label text-muted">
                                Запомнить меня
                            </label>
                        </div>
                        <a href="#" className="text-decoration-none text-primary">Забыли пароль?</a>
                    </div>

                    {/* Кнопка входа */}
                    <button
                        type="submit"
                        className="btn btn-primary w-100 py-2 mb-3 fw-bold"
                    >
                        Войти
                    </button>
                </form>
            </div>
        </>
    )
}