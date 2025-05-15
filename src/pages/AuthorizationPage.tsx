import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {WorkerContext} from "../context/workerContext/WorkerContext";
import {EdembackContext} from "../context/edemback/EdembackContext";
import api from "../api";
import {IWorkers} from "../models";

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


    const formatPhone = (value: string) => {
        const numbers = value.replace(/\D/g, '').substring(1); // Удаляем все кроме цифр и +
        let formatted = '+7';

        if (numbers.length > 0) {
            formatted += ` (${numbers.substring(0, 3)}`;
        }
        if (numbers.length > 3) {
            formatted += `) ${numbers.substring(3, 6)}`;
        }
        if (numbers.length > 6) {
            formatted += `-${numbers.substring(6, 8)}`;
        }
        if (numbers.length > 8) {
            formatted += `-${numbers.substring(8, 10)}`;
        }

        return formatted;
    };

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
                const response = await api.post(`/Auth`, workerAuth)
                const foundWorker = response.data as IWorkers
                console.log('found', foundWorker)

                if (foundWorker) {
                    console.log('role', foundWorker.id_Role)
                    workerContext?.setWorker(foundWorker)
                    switch (foundWorker.id_Role) {
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
            <form onSubmit={submitHandler}>
                <div className="container-fluid w-50 text-center pt-5" style={{color: "#6096ba"}}>
                    <h1>Авторизация</h1>
                    <input
                        type="tel"
                        value={phone}
                        onChange={handleChange}
                        placeholder="+7 (123) 456-78-90"
                        maxLength={18}
                        className="form-control"
                    />
                    <input
                        type="password"
                        className="form-control mt-3"
                        placeholder="Введите пароль..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <span style={{color: "red"}}>Пользователь не найден!</span>}
                    <div>
                        <button type="submit" className="btn mt-5" id='btnAuth' style={{background: "#6096ba", color: "white"}}>Войти</button>
                    </div>
                </div>
            </form>
        </>
    )
}