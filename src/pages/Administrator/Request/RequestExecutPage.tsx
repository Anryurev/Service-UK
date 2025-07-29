import React, {useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {useNavigate} from "react-router-dom";
import api from "../../../api";
import {IObject, IRequest, IRole, IWork, IWorkers} from "../../../models";
import {useRequest} from "../../../storage/Request/useRequest";

export function RequestExecutPage(){
    const [workersByRole, setWorkersByRole] = useState<Record<number, {role: IRole, workers: IWorkers[]}>>({})
    const [selectedTypeWork, setSelectedTypeWork] = useState({id: 0, name: "Выберите тип работы"})
    const [selectedWorkers, setSelectedWorkers] = useState<number[]>([])
    const [errorRole, setErrorRole] = useState(false)
    const [errorWorker, setErrorWorker] = useState(false)
    const [typesWork, setTypesWork] = useState<IWork[]>([])
    const [allWorker, setAllWorker] = useState(false)
    const { getRequestFromLocalStorage, updateRequestTypeWork } = useRequest()
    const [currentObject, setCurrentObject] = useState<IObject>()
    const navigate = useNavigate()
    const request: IRequest = getRequestFromLocalStorage()

    const LoadingTypesWork = async () => {
        const response = await api.get(`/TypesWork`)
        const responseObject = await api.get(`/Object/${request.object_Id}`)
        setTypesWork(response.data)
        setCurrentObject(responseObject.data)
    }

    const LoadingWorkers = async (idTypeWork: number) => {
        if (idTypeWork === 0) {
            setWorkersByRole({})
            return
        }

        const responseRoles = await api.get(`/TypeWork/${idTypeWork}`)
        const typeWorkRoles: IWork = responseRoles.data

        if (!typeWorkRoles) {
            setWorkersByRole({})
            return
        }

        const roles: IRole[] = typeWorkRoles.roles || []
        const workersByRole: Record<number, {role: IRole, workers: IWorkers[]}> = {}

        // Загружаем работников для каждой роли
        await Promise.all(roles.map(async (role) => {
            const response = await api.get<IWorkers[]>(`/Workers/Worker?Role=${role.role_Id}`)
            workersByRole[role.role_Id] = {
                role: role,
                workers: response.data
            }
        }))

        setWorkersByRole(workersByRole);
    }

    useEffect(() => {
        setErrorRole(false)
        LoadingWorkers(selectedTypeWork.id)
    }, [selectedTypeWork])

    useEffect(() => {
        LoadingTypesWork()
    }, [])

    const handleCheckboxChange = (workerId: number) => {
        setErrorWorker(false)
        setSelectedWorkers(prevSelected => {
            if (prevSelected.includes(workerId)) {
                return prevSelected.filter(id => id !== workerId)
            } else {
                return [...prevSelected, workerId]
            }
        })
    }

    const handleClick = () => {
        if(selectedTypeWork.name === "Выберите тип работы"){
            setErrorRole(true)
        }else if (!allWorker && selectedWorkers.length === 0){
            setErrorWorker(true)
        }
        else {
            if(selectedWorkers.length === 0){
                updateRequestTypeWork(selectedTypeWork.name, null)
            } else{
                updateRequestTypeWork(selectedTypeWork.name, selectedWorkers)
            }
            navigate(`/request/description`)
        }
    }

    return(
        <>
            <Navbar/>
            <div className="d-flex flex-column min-vh-100 container-sm" style={{paddingTop: '60px'}}>
                <main className="flex-grow-1">
                    <header className="p-3 bg-light sticky-top" style={{zIndex: 1020}}>
                        <div>
                            Объект: {currentObject?.street} {currentObject?.house} кв. {currentObject?.apartment}
                        </div>
                        <div className="dropdown mb-2">
                            <button
                                className="btn btn-outline-secondary dropdown-toggle w-100 text-start"
                                type="button"
                                id="roleDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {selectedTypeWork.name}
                            </button>
                            <ul className="dropdown-menu w-100" aria-labelledby="roleDropdown">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        type="button"
                                        onClick={() => setSelectedTypeWork({id: 0, name: "Выберите тип работы"})}
                                    >
                                        Выберите тип работы
                                    </button>
                                </li>
                                {typesWork.map(work => (
                                    <li key={work.id_Work}>
                                        <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={() => {
                                                setSelectedTypeWork({id: work.id_Work, name: work.name})
                                            }}
                                        >
                                            {work.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <input type="hidden" name="id_Role" value={selectedTypeWork.id}/>
                            {errorRole && <div className="alert alert-danger">Выберите тип работы!</div>}
                            {errorWorker && <div className="alert alert-danger">Выберите хотя бы одного работника!</div>}
                        </div>

                        <div className="form-check form-switch mb-2">
                            <input
                                type="checkbox"
                                className="form-check-input me-1"
                                name='allWorkersRole'
                                role="switch"
                                checked={allWorker}
                                onChange={() => {
                                    setAllWorker(prev => (!prev))
                                }}
                            />
                            <label htmlFor='allWorkersRole'>{allWorker? "Выполнение задания выбирает сам работник": "Выбор конкретного работника"}</label>
                        </div>
                        {allWorker && (
                            <div className="alert alert-warning">
                                При данном режиме задание отправится всем подходящим сотрудникам для выбранной работы. Первый сотрудник, который начнет это задание назначается исполнителем данного задания.
                            </div>
                        )}
                    </header>

                    {!allWorker && <div>
                        <label>Выберите работника</label>
                        {Object.values(workersByRole).map(({role, workers}) => (
                            <div key={role.role_Id} className="mb-3">
                                <h5 className="fw-bold mb-2">{role.name}</h5>
                                <ul className="list-group">
                                    {workers.map(worker => (
                                        <li
                                            className="list-group-item"
                                            key={worker.id}
                                        >
                                            <div className="form-check">
                                                <input
                                                    id={`checkWorker-${worker.id}`}
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={selectedWorkers.includes(worker.id)}
                                                    onChange={() => handleCheckboxChange(worker.id)}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`checkWorker-${worker.id}`}
                                                >
                                                    {worker.surname} {worker.name} {worker.fathername}
                                                </label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>}
                </main>
                <footer className="p-3 bg-light">
                    <button
                        className="btn btn-primary w-100"
                        onClick={handleClick}
                    >
                        Далее
                    </button>
                </footer>
            </div>
        </>
    )
}