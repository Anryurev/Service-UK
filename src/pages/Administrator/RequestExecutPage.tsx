import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../components/Navbar";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {useNavigate, useSearchParams} from "react-router-dom";
import api from "../../api";
import {IObject, IRequest, IRole, IUsers} from "../../models";
import {UserContext} from "../../context/userContext/UserContext";
import {RequestContext} from "../../context/requestContext/RequestContext";

export function RequestExecutPage(){
    const [UsersRole, setUsersRole] = useState<IUsers[]>([])
    const [selectedRole, setSelectedRole] = useState({id: 0, name: "Выберите роль"})
    const [selectedWorker, setSelectedWorker] = useState(0)
    const [errorRole, setErrorRole] = useState(false)
    const [roles, setRoles] = useState<IRole[]>([])
    const [allWorker, setAllWorker] = useState(false)
    const requestContext = useContext(RequestContext)
    const [updatedRequest, setUpdatedRequest] = useState<IRequest>(requestContext.request)
    const navigate = useNavigate()

    const LoadingRoles = async () => {
        const response = await api.get(`/Roles/NoImportant`)
        setRoles(response.data)
    }

    const LoadingWorker = async (idRole: number) => {
        let response = null
        if (idRole === 0){
            response = []
        }else {
            const res = await api.get(`/Workers?Role=${idRole}`)
            response = res.data
        }
        setUsersRole(response)
    }

    useEffect(() => {
        setErrorRole(false)
        LoadingWorker(selectedRole.id)
    }, [selectedRole])

    useEffect(() => {
        LoadingRoles()
    }, [])

    useEffect(() => {
        if (selectedRole.id !== 0) {
            const newRequest = {
                ...requestContext.request,
                role_Id: selectedRole.id,
                ...(selectedWorker !== 0 && { worker_Id: selectedWorker }) // Добавляем worker_Id только если selectedWorker !== 0
            }
            requestContext.setRequest(newRequest)
        } else {
            setErrorRole(true)
        }
    }, [selectedWorker, selectedRole])

    const styleItem = (worker: IUsers) => worker.id === UsersRole.find(us => us.id === selectedWorker)?.id? "list-group-item border-1 border-success" : "list-group-item border-1"

    return(
        <>
            <Navbar/>
            <div className="d-flex flex-column min-vh-100 container-sm" style={{paddingTop: '60px'}}>
                <main className="flex-grow-1">
                    <div className="p-3 bg-light fixed-top" style={{marginTop: '56px'}}>
                        <div className="dropdown mb-2">
                            <button
                                className="btn btn-outline-secondary dropdown-toggle w-100 text-start"
                                type="button"
                                id="roleDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {selectedRole.name}
                            </button>
                            <ul className="dropdown-menu w-100" aria-labelledby="roleDropdown">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => setSelectedRole({id: 0, name: "Выберите роль"})}
                                    >
                                        Выберите роль
                                    </button>
                                </li>
                                {roles.map(role => (
                                    <li key={role.role_Id}>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() => setSelectedRole({id: role.role_Id, name: role.name})}
                                        >
                                            {role.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <input type="hidden" name="id_Role" value={selectedRole.id}/>
                            {errorRole && <small style={{color: "red"}}>Выберите роль!</small>}
                        </div>

                        <div className="mb-2">
                            <input
                                type="checkbox"
                                className="form-check-input me-1"
                                name='allUsersRole'
                                checked={allWorker}
                                onChange={() => {
                                    setAllWorker(prev => (!prev))
                                    console.log(allWorker)
                                }}
                            />
                            <label htmlFor='kitchen'>Для всех работников должности</label>
                        </div>
                    </div>

                    {!allWorker && <div>
                        <label>Выберите работника</label>
                        <ul className="list-group">
                            {UsersRole.map(worker => (
                                <li
                                    className={styleItem(worker)}
                                    aria-current="true"
                                    key={worker.id}
                                    onClick={() => {
                                        // TODO Реализовать изменение цвета li работника при нажатии
                                        setSelectedWorker(worker.id)
                                    }}
                                >
                                    {worker.surname + ' ' + worker.name + ' ' + worker.fathername}
                                </li>
                            ))}
                        </ul>
                    </div>}
                </main>
                <footer className="p-3 bg-light fixed-bottom">
                    <button
                        className="btn btn-primary w-100"
                        onClick={() => navigate(`/request/description`)}
                        // TODO Изменить цвет кнопки
                    >
                        Далее
                    </button>
                </footer>
            </div>
        </>
    )
}