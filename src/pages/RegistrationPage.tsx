import React from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

export function RegistrationPage(){
    const navigate = useNavigate()
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        navigate('/home');
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="container-fluid w-50 text-center pt-5" style={{color: "#6096ba"}}>
                    <h1>Регистрация</h1>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="nameUser" placeholder="Введите имя..."/>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="surnameUser" placeholder="Введите фамилию..."/>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="fatherNameUser" placeholder="Введите отчество..."/>
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" id="login" placeholder="Введите email..."/>
                    </div>
                    <div className="mb-3">
                        <input type="number" className="form-control" id="numberPhone" placeholder="Введите номер телефона..."/>
                    </div>
                    <div className="mb-3">
                        <input type="date" className="form-control" id="dateOfBirth" placeholder="Введите дату рождения..."/>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="password" placeholder="Введите пароль..."/>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="replayPassword" placeholder="Подтвердите пароль..."/>
                    </div>

                    <select className="form-select mt-3" aria-label="Default select example">
                        <option defaultValue="-1">Выберете роль</option>
                        <option value="1">Администратор</option>
                        <option value="2">Оператор</option>
                        <option value="3">Уборщица</option>
                        <option value="4">Электрик</option>
                        <option value="5">Сантехник</option>
                    </select>
                    <button type="submit" className="btn mt-5" style={{background: "#6096ba", color: "white"}}>Зарегистрироваться</button>
                    <Link className="d-block" to="/">Авторизация</Link>
                </div>
            </form>
        </>
    )
}