import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {IWorkers} from "../../../models";
import {Navbar} from "../../../components/Navbar";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {roles} from "../../../data/rolesdata";

export function WorkerPage(){
    const { workerId } = useParams<{ workerId: string }>()
    const [isEditingMod, setIsEditingMod] = useState(false)
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const [worker, setWorker] = useState<IWorkers | undefined>({
        id: 0,
        name: "",
        surname: "",
        fathername: "",
        phoneNumber: "",
        email: "",
        birthday: "",
        id_Role: 0,
        id_Office: 0,
        password: ""
    })

    async function findWorker(){
        const worker_current: IWorkers | undefined = edemContext.state.workers.find(worker => worker.id === Number(workerId));
        setWorker(worker_current)
    }

    useEffect(() => {
        findWorker()
    }, [])

    if(!worker){
        return (
            <div className="container" style={{paddingTop: "60px"}}>
                <h1>Пользователь не найден</h1>
            </div>
        )
    }

    const handleEditWorker = () => {
        setIsEditingMod(true)
    }

    const handleRemoveWorker = async (workerID: number) => {
        edemContext.deleteWorker(workerID)
        navigate(`/workers`)
    }

    const getRoleNameById = (roleId: number): string => {
        console.log("roles", edemContext.state.roles)
        const role = roles.find((role) => role.role_Id === roleId)
        return role ? role.name : "Роль не найдена"
    }

    return(
        <>
            <Navbar/>
            <div className="container" style={{paddingTop: "60px"}}>
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card custom-card shadow-lg">
                                <div className="card-header text-white" style={{background: "#a3cef1"}}>
                                    <h3 className="card-title mb-0">Информация о пользователе</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4 text-center d-flex align-items-center">
                                            <h5 className="mb-1"><strong>Имя: </strong> {worker.name}</h5>
                                        </div>
                                        <div className="col-md-4 text-center d-flex align-items-center">
                                            <h5 className="mb-1"><strong>Фамилия: </strong> {worker.surname}</h5>
                                        </div>
                                        <div className="col-md-4 text-center d-flex align-items-center">
                                            <h5 className="mb-1"><strong>Отчество: </strong> {worker.fathername}</h5>
                                        </div>

                                        <div className="col-md-8">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <strong>Номер телефона: </strong>{worker.phoneNumber}
                                                </li>
                                                <li className="list-group-item">
                                                    <strong>Электронная почта: </strong>{worker.email}
                                                </li>
                                                <li className="list-group-item">
                                                    <strong>Должность: </strong>{getRoleNameById(worker.id_Role)}
                                                </li>
                                                <li className="list-group-item">
                                                    <strong>Дата рождения: </strong>{worker.birthday}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card-footer bg-light d-flex justify-content-between align-items-center">
                                            <button className="btn btn-sm btn-outline-primary" onClick={handleEditWorker}>Редактировать</button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveWorker(worker.id)}>Удалить</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}