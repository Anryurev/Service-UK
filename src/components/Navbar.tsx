import React, {useContext, useEffect, useState} from "react"
import {NavLink, useNavigate} from "react-router-dom"
import {WorkerContext} from "../context/workerContext/WorkerContext";
import {getAuthDataFromLocalStorage} from "../storage/loacalStorage";
import api from "../api";
import {IRole} from "../models";
import {Dropdown} from "react-bootstrap";
import {useAuth} from "../storage/useAuth";

export const Navbar = () => {
    const workerContext = useContext(WorkerContext)
    const {worker} = getAuthDataFromLocalStorage()
    const {logout} = useAuth()

    const navigate = useNavigate()
    const [role, setRole] = useState<IRole>({
        role_Id: 0,
        name: "",
        salary: 0,
        add_Parametrs: [{
            id_Parametr: 0,
            role_Id: 0,
            parametr: ""
        }],
        levelImportant: 0
    })

    const getRoleById = async (roleId?: number) => {
        const response = await api.get(`/Role/${roleId}`)
        setRole(response.data)
    }

    const logoutClick = () => {
        logout()
        navigate('/')
    }

    useEffect(() => {
        getRoleById(worker?.id_Role)
    }, [])

    return(
        <nav className="navbar fixed-top" style={{background: "#6096ba", height: "63px"}}>
            <div className="container-fluid">
                <NavLink className="navbar-brand"  style={{marginLeft: "2px"}} to={`${localStorage.getItem('main_page')}`}>Сервис УК</NavLink>
                <Dropdown className="text-end">
                    <Dropdown.Toggle
                        variant="light"
                        id="dropdown-user-menu"
                        className="d-flex flex-column align-items-end custom-dropdown-toggle"
                    >
                        <div className="d-flex align-items-center">
                            <span className="dropdown-arrow me-2">
                                <i className="bi bi-caret-down-fill"></i>
                            </span>
                            <div>
                                <div>{role.name}</div>
                                <div className="small">
                                    {worker ? `${worker.surname} ${worker.name}` : 'Неизвестный пользователь'}
                                </div>
                            </div>
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end">
                        <Dropdown.Item onClick={logoutClick}>
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Выйти
                        </Dropdown.Item>
                        {role.name === "Администратор" &&
                        <>
                            <Dropdown.Item onClick={() => navigate(`/request/object`)}>
                                <i className="bi bi-list-task me-2"></i>
                                Заявки
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate(`/reports`)}>
                                <i className="bi bi-clipboard-data me-2"></i>
                                Отчеты
                            </Dropdown.Item>
                        </>
                        }
                        {role.levelImportant === 4 &&
                            <>
                                <Dropdown.Item onClick={() => navigate(`/execut`)}>
                                    <i className="bi bi-list-task me-2"></i>
                                    Заявки
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate(`/reports`)}>
                                    <i className="bi bi-clipboard-data me-2"></i>
                                    Отчеты
                                </Dropdown.Item>
                            </>
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Edem-Service</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </nav>
    )

}