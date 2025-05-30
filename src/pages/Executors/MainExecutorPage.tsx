import React, {useEffect, useState} from "react";
import {Navbar} from "../../components/Navbar";
import { Button, Card, Form, ListGroup, Badge } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {IObject, IRequest, IStatus, IWork, IWorkers} from "../../models";
import api from "../../api";
import RequestExecutCard from "../../components/Request/RequestExecutCard";
import {compile} from "nth-check";
import {getAuthDataFromLocalStorage} from "../../storage/loacalStorage";

interface ITask {
    id: number;
    title: string;
    description: string;
    status: "1" | "2" | "3" | "4";
}

export function MainExecutorPage(){
    const [requests, setRequests] = useState<IRequest[]>([])
    const [filterStatus, setFilterStatus] = useState<"0" | ITask["status"]>("0")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const LoadingData = async () => {
        try {
            const {worker} = getAuthDataFromLocalStorage()
            const responseRequest = await api.get(`/Requests/Worker`)
            console.log('requests', responseRequest.data)
            setRequests(responseRequest.data)
        } catch (err){
            setError('Ошибка доступа')
            console.error(err)
        }
    }

    useEffect(() => {
        LoadingData()
    }, [])

    // Фильтрация заданий по статусу
    const filteredTasks = requests.length > 0? requests.filter(request =>
        filterStatus === "0" ? true : request.status === filterStatus
    ): []

    // Изменение статуса задания
    const updateRequestStatus = async (requestId: number, newStatus: IRequest["status"]) => {
        const response = await api.patch(`/ChangeStatusRequest/${requestId}?status=${newStatus}`)
        setRequests((prevRequests) =>
            prevRequests.map((request) =>
                request.request_Id === requestId ? { ...request, status: newStatus } : request
            )
        )
    }

    if (error) return <div className="alert alert-danger">{error}</div>

    return (
        <>
            <Navbar/>
            <div style={{paddingTop: '60px'}}>
                <div className="container mt-2">
                    <h1 className="mb-4">Задания</h1>

                    {/* Фильтр по статусу */}
                    <Form.Group className="mb-4">
                        <Form.Label>Фильтр по статусу:</Form.Label>
                        <Form.Control
                            as="select"
                            value={filterStatus}
                            onChange={(e) =>
                                setFilterStatus(e.target.value as "0" | ITask["status"])
                            }
                        >
                            <option value="0">Все</option>
                            <option value="1">Создано</option>
                            <option value="2">Назначено</option>
                            <option value="3">В процессе</option>
                            <option value="4">Завершено</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Список заданий */}
                    <ListGroup>
                        {filteredTasks.length > 0 && filteredTasks.map((request) => (
                            <RequestExecutCard
                                onClick={() => navigate(`/request/${request.request_Id}`)}
                                request={request}
                                key={request.request_Id}
                            />
                        ))}
                    </ListGroup>
                </div>
            </div>
        </>
    )
}