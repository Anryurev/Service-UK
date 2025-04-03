import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IUsers} from "../models";
import axios from "axios";
import {users} from "../data/usersdata";
import {UserContext} from "../context/userContext/UserContext";

export function AuthorizationPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const userContext = useContext(UserContext)

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        const foundUser = users.find(user => user.email === username && user.password === password)

        if (foundUser) {
            userContext?.setUser(foundUser)
            switch (foundUser.id_Role) {
                case 1:
                    navigate('/home')
                    break
                case 2:
                    navigate('/home')
                    break
                case 3:
                    navigate('/home')
                    break
                case 4:
                    navigate('/execut')
                    break
                case 5:
                    navigate('/execut')
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="form-control mt-3"
                        placeholder="Введите пароль..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn mt-5" id='btnAuth' style={{background: "#6096ba", color: "white"}}>Войти</button>
                </div>
            </form>
        </>
    )
}