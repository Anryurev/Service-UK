import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {WorkerNote} from "../../../components/Worker/WorkerNote";
import {useNavigate} from "react-router-dom";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {Form, FormSelect} from "react-bootstrap";
import {SidebarMenu} from "../../../components/SidebarMenu";
import api from "../../../api";
import {IOffice, IWorkers} from "../../../models";
import {getAuthDataFromLocalStorage} from "../../../storage/loacalStorage";

export function WorkersPage(){
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedOffice, setSelectedOffice] = useState<number>(0)
    const [allWorkers, setAllWorkers] = useState<IWorkers[]>([])
    const [workers, setWorkers] = useState<IWorkers[]>([])
    const [offices, setOffices] = useState<IOffice[]>([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const edemContext = useContext(EdembackContext)
    const {role} = getAuthDataFromLocalStorage()


    const LoadingData = async () => {
        try{
            setLoading(true)
            const response = await api.get(`/Workers${Number(role?.levelImportant) === 1? "" : "/Worker"}`)
            setAllWorkers(response.data)
            setLoading(false)

            if(role?.levelImportant === 1){
                const responseOffices = await api.get(`/Offices`)
                setOffices(responseOffices.data)
            }
        }catch (e){
            setLoading(true)
            console.error(e)
        }
    }

    // Фильтрация объектов
    useEffect(() => {
        let filtered = allWorkers

        // Фильтр по офису
        if (selectedOffice > 0) {
            filtered = filtered.filter(worker => worker.id_Office === selectedOffice)
        }

        // Фильтр по поисковому запросу
        if (searchQuery) {
            filtered = filtered.filter((worker) =>
                worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                worker.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                worker.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                worker.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
                // worker.role.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        setWorkers(filtered)
    }, [selectedOffice, searchQuery, allWorkers])

    useEffect(() => {
        LoadingData()
        // edemContext.getAllWorkers()
        // eslint-disable-next-line
    }, [edemContext.state.workers])

    const handleOfficeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOffice(Number(e.target.value))
    }

    const handleClickWorker = (workerId: number) => {
        navigate(`/workers/${workerId}`)
    }

    return(
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <div className="d-flex justify-content-between flex-row h-100 p-2 border-start align-items-center">
                    <h1 className="mb-3">Список сотрудников</h1>
                    {Number(role?.levelImportant) < 3
                        && <button
                            className="btn h-75"
                            style={{background: "#6096ba", color: "white"}}
                            onClick={() => navigate('/Workers/create')}
                        >
                            Добавить сотрудника
                        </button>}
                </div>
                <Form.Group className="mb-4">
                    <Form.Label>Поиск по сотрудникам:</Form.Label>
                    <Form.Control
                        type="text"
                        value={searchQuery}
                        placeholder="Поиск пользователей"
                        onChange={(e) =>
                            setSearchQuery(e.target.value)
                        }
                    >
                    </Form.Control>

                    {/*Фильтрация по офисам*/}
                    {role?.levelImportant === 1 && (
                        <>
                            <Form.Label className="mt-3">Фильтр по офисам:</Form.Label>
                            <FormSelect
                                className="form-control"
                                value={selectedOffice}
                                onChange={handleOfficeChange}
                            >
                                <option value={0}>Все офисы</option>
                                {offices.map(office => (
                                    <option key={office.office_Id} value={office.office_Id}>
                                        ул. {office.street} д. {office.house}
                                    </option>
                                ))}
                            </FormSelect>
                        </>
                    )}
                </Form.Group>

                {loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {workers.length > 0 ? (
                            workers.map(worker =>
                                <WorkerNote
                                    worker={worker}
                                    onRemove={() => edemContext.deleteWorker(worker.id)}
                                    onClick={handleClickWorker}
                                    key={worker.id}
                                />
                            )
                        ) : (
                            <div className="alert alert-warning">Объекты отсутствуют!</div>
                        )}
                    </>
                )}
            </div>
        </>
    )
}