import React, {useEffect, useState} from "react";
import {Navbar} from "../../components/Navbar";
import { Button, Card, Form, ListGroup, Badge } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {IRequest} from "../../models";
import api from "../../api";

interface ITask {
    id: number;
    title: string;
    description: string;
    status: "pending" | "in_progress" | "completed";
}

const initialTasks: ITask[] = [
    {
        id: 1,
        title: "Уборка помещения",
        description: "Провести уборку в квартире №5.",
        status: "pending",
    },
    {
        id: 2,
        title: "Ремонт освещения",
        description: "Починить свет в квартире №10.",
        status: "in_progress",
    },
    {
        id: 3,
        title: "Ремонт крана",
        description: "Починить кран в квартире №2.",
        status: "completed",
    },
]

export function MainExecutorPage(){
    const [requests, setRequests] = useState<IRequest[]>([])
    const [filterStatus, setFilterStatus] = useState<"all" | ITask["status"]>("all")
    const navigate = useNavigate()

    const LoadingData = async () => {
        const response = await api.get(`/Requests`)
        setRequests(response.data)
    }

    useEffect(() => {
        LoadingData()
    }, [])

    // Фильтрация заданий по статусу
    const filteredTasks = requests.filter(request =>
        filterStatus === "all" ? true : request.status === filterStatus
    )

    // Изменение статуса задания
    const updateRequestStatus = (requestId: number, newStatus: IRequest["status"]) => {
        setRequests((prevRequests) =>
            prevRequests.map((request) =>
                request.request_Id === requestId ? { ...request, status: newStatus } : request
            )
        )
    }

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
                                setFilterStatus(e.target.value as "all" | ITask["status"])
                            }
                        >
                            <option value="all">Все</option>
                            <option value="pending">Ожидает выполнения</option>
                            <option value="in_progress">В процессе</option>
                            <option value="completed">Завершено</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Список заданий */}
                    <ListGroup>
                        {filteredTasks.map((request) => (
                            <ListGroup.Item key={request.request_Id} className="mb-3">
                                <Card>
                                    <Card.Body>
                                        {/*Тут выводится тип задания*/}
                                        <Card.Title>{request.request_Id}</Card.Title>
                                        {/*Тут выводится описание задания*/}
                                        <Card.Text>{request.worker_Id}</Card.Text>
                                        {/*Создано Назначено В процессе Завершено*/}
                                        <Badge
                                            bg={
                                                request.status === "pending"
                                                    ? "warning"
                                                    : request.status === "in_progress"
                                                        ? "primary"
                                                        : "success"
                                            }
                                            className="mb-2"
                                        >
                                            {request.status === "pending"
                                                ? "Ожидает выполнения"
                                                : request.status === "in_progress"
                                                    ? "В процессе"
                                                    : "Завершено"}
                                        </Badge>
                                        <div className="d-flex gap-2">
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() =>
                                                    updateRequestStatus(request.request_Id, "in_progress")
                                                }
                                                disabled={request.status !== "pending"}
                                            >
                                                Начать выполнение
                                            </Button>
                                            <Button
                                                variant="outline-success"
                                                size="sm"
                                                onClick={() => {
                                                    updateRequestStatus(request.request_Id, "completed")
                                                    navigate('/execut/report')
                                                }}
                                                disabled={request.status !== "in_progress"}
                                            >
                                                Перейти к отчету
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </div>
        </>
    )
}