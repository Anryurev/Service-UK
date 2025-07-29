import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from "../storage/useAuth";
import {getAuthDataFromLocalStorage} from "../storage/loacalStorage";
import {IRole} from "../models";
import api from "../api";

interface SidebarProps {
    isOpen: boolean;
}

export const SidebarMenu: React.FC<SidebarProps> = ({ isOpen}) => {
    const { logout } = useAuth()
    const navigate= useNavigate()
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const {worker} = getAuthDataFromLocalStorage()
    const [loading, setLoading] = useState(true)
    const {role} = getAuthDataFromLocalStorage()

    const logoutClick = () => {
        logout()
        navigate('/')
    }

    return (
        <>
            {/* Кнопка меню для мобильных */}
            <button
                className="btn btn-primary d-lg-none position-fixed"
                style={{
                    left: '10px',
                    top: '70px',
                    zIndex: 1100,
                    transition: 'all 0.3s ease'
                }}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                <i className={`bi ${isMobileOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
            </button>

            {/* Боковая панель - исправленная версия */}
            <div
                className={`position-fixed start-0 top-0 h-100 bg-light shadow-lg sidebar ${isMobileOpen ? 'd-block' : 'd-lg-block'}`}
                style={{
                    width: '250px',
                    zIndex: 1000,
                    overflowY: 'auto',
                    paddingTop: '60px',
                    transform: isMobileOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease-in-out'
                }}
            >
                <div className="d-flex flex-column h-100 p-3">
                    <ul className="nav nav-pills flex-column mb-auto">
                        {[
                            { to: "/home", icon: "bi-calendar-check", text: "Календарь", for: [1, 3] },
                            { to: "/objects", icon: "bi-building", text: "Объекты", for: [1, 2, 3] },
                            { to: "/workers", icon: "bi-people", text: "Сотрудники", for: [1, 2] },
                            { to: "/roles", icon: "bi-person-workspace", text: "Должности", for: [1, 2] },
                            { to: "/offices", icon: "bi-buildings", text: "Офисы", for: [1] },
                            { to: "/works", icon: "bi-list-task", text: "Задания", for: [1, 2] }
                        ].filter(item => role ? item.for.includes(role.levelImportant) : false)
                            .map((item) => {
                                return (
                                    <li className="nav-item mb-0" key={item.to}>
                                        <Link
                                            to={item.to}
                                            className={`nav-link ${window.location.pathname === item.to ? 'active' : ''}`}
                                            style={{color: window.location.pathname === item.to ? 'white' : '#274c77'}}
                                        >
                                            <i className={`bi ${item.icon} me-3 fs-5`}></i>
                                            <span className="fs-6">{item.text}</span>
                                        </Link>
                                    </li>
                                )
                            }
                                )}
                    </ul>

                    <div className="mt-auto">
                        <button
                            className="btn btn-danger w-100 d-flex align-items-center justify-content-center py-2"
                            onClick={logoutClick}
                        >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Выйти
                        </button>
                    </div>
                </div>
            </div>

            {/* Оверлей для мобильных */}
            {isMobileOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
                    style={{ zIndex: 999 }}
                    onClick={() => setIsMobileOpen(false)}
                ></div>
            )}
        </>
    )
}