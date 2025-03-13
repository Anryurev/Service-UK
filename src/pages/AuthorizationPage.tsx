import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IUsers} from "../models";
import axios from "axios";

export function AuthorizationPage(){

    // ЭТО НАДО БУДЕТ УДАЛИТЬ

    const [users, setUsers] = useState<IUsers[]>([])

    async function fetchUsers(){
        const response = await axios.get<IUsers[]>('https://fakestoreapi.com/users')
        setUsers(response.data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    ////////////////////////////////////////





    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        const hasUserName = users.some(user => user['email'] === username)

        navigate('/home');
        if (hasUserName) {
            const hasUserPass = users.some(user => user['password'] === password)
            if(hasUserPass){
                navigate('/home');
            }
        } else {
            alert('Неверный логин или пароль');
        }
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="container-fluid w-50 text-center pt-5" style={{color: "#6096ba"}}>
                    <h1>Авторизация</h1>
                    <input
                        type="email"
                        inputMode="email"
                        className="form-control mt-5"
                        placeholder="Введите ваш email..."
                        value="john@gmail.com"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="form-control mt-3"
                        placeholder="Введите пароль..."
                        value="m38rmF$"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn mt-5" id='btnAuth' style={{background: "#6096ba", color: "white"}}>Войти</button>
                    <p>john@gmail.com</p>
                    <p>m38rmF$</p>
                </div>
            </form>
        </>
    )
}