import React, {useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {useNavigate} from "react-router-dom";
import api from "../../../api";
import {IObject, IRequest, IRole, IWork, IWorkers} from "../../../models";
import {useRequest} from "../../../storage/Request/useRequest";

export function RequestExecutPage(){
    const [workersRole, setWorkersRole] = useState<IWorkers[]>([])
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
        let response: IWorkers[]
        if (idTypeWork === 0){
            response = []
        }else {
            const responseRoles = await api.get(`/TypeWork/${idTypeWork}`)
            console.log('typeWorks', responseRoles.data)
            const typeWorkRoles: IWork = responseRoles.data

            let roles: IRole[] = []

            if(typeWorkRoles){
                roles = typeWorkRoles.roles
                console.log('roles', roles)
            }

            const requests = roles.map(role =>
                api.get<IWorkers[]>(`/Workers/Worker?Role=${role.role_Id}`)
            )

            // Выполняем все запросы параллельно
            const responses = await Promise.all(requests)

            // Объединяем результаты (flatMap уберет вложенность)
            const allWorkers = responses.flatMap(response => response.data)

            // Удаляем дубликаты (если возможно повторение работников)
            response = Array.from(new Map(
                allWorkers.map(worker => [worker.id, worker])
            ).values())
        }
        setWorkersRole(response)
        console.log('workers role', workersRole)
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
                // Если ID уже есть в массиве - удаляем
                return prevSelected.filter(id => id !== workerId)
            } else {
                // Если ID нет в массиве - добавляем
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
            updateRequestTypeWork(selectedTypeWork.name, selectedWorkers)
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
                                            onClick={() => setSelectedTypeWork({id: work.id_Work, name: work.name})}
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
                    </header>

                    {!allWorker && <div>
                        <label>Выберите работника</label>
                        <ul className="list-group">
                            {workersRole.map(worker => (
                                    <li
                                        className="form-control"
                                        aria-current="true"
                                        key={worker.id}
                                    >
                                        <div className="input-group">
                                            <div className="input-group-text me-2">
                                                <input
                                                    id={`checkWorker-${worker.id}`}
                                                    className="form-check-input mt-0"
                                                    type="checkbox"
                                                    checked={selectedWorkers.includes(worker.id)}
                                                    onChange={() => handleCheckboxChange(worker.id)}
                                                />
                                            </div>
                                            <label htmlFor={`checkWorker-${worker.id}`}>
                                                {worker.surname + ' ' + worker.name + ' ' + worker.fathername}
                                            </label>
                                        </div>
                                    </li>

                            ))}
                        </ul>
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