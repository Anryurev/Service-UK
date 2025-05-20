import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from "../storage/useAuth";

interface SidebarProps {
    isOpen: boolean;
}

export const SidebarMenu: React.FC<SidebarProps> = ({ isOpen}) => {
    const { logout } = useAuth()
    const navigate= useNavigate()

    const logoutClick = () => {
        logout()
        navigate('/')
    }

    return (
        <div className="position-fixed start-0 top-0 h-100 bg-light"
             style={{ width: '250px', zIndex: 1000, overflowY: 'auto', paddingTop: "60px" }}>
            <div className="d-flex flex-column h-100 p-3 border-start">
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link" style={{color: "#274c77"}} aria-current="page">
                            <i className="bi bi-calendar-check me-2"></i>
                            Календарь
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/objects" className="nav-link" style={{color: "#274c77"}}>
                            <i className="bi bi-building me-2"></i>
                            Объекты
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/workers" className="nav-link" style={{color: "#274c77"}}>
                            <i className="bi bi-people me-2"></i>
                            Сотрудники
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/roles" className="nav-link" style={{color: "#274c77"}}>
                            <i className="bi bi-person-workspace me-2"></i>
                            Должности
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/offices" className="nav-link" style={{color: "#274c77"}}>
                            <i className="bi bi-buildings me-2"></i>
                            Офисы
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/works" className="nav-link" style={{color: "#274c77"}} >
                            <i className="bi bi-list-task me-2"></i>
                            Задания
                        </Link>
                    </li>
                </ul>

                {/* Выпадающий список */}
                <div className="dropdown mb-3">
                    <button
                        className="btn btn-danger w-100"
                        type="button" onClick={logoutClick}
                    >
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    )
}