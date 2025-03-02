import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export function Authorization(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        if (username === 'user@mail.ru' && password === 'pass') {
            // Перенаправление на главную страницу после успешной авторизации
            navigate('/home');
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
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        className="form-control mt-3"
                        placeholder="Введите пароль..."
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn mt-5" style={{background: "#6096ba", color: "white"}}>Войти</button>
                    <Link className="d-block" to="/registration">Регистрация</Link>
                </div>
            </form>
        </>
    )
}