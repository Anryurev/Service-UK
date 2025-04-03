import React, {useState} from "react";
import {Navbar} from "../../components/Navbar";
import { Button, Card, Form, ListGroup, Badge } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

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
    const [tasks, setTasks] = useState<ITask[]>(initialTasks)
    const [filterStatus, setFilterStatus] = useState<"all" | ITask["status"]>("all")
    const navigate = useNavigate()

    // Фильтрация заданий по статусу
    const filteredTasks = tasks.filter(task =>
        filterStatus === "all" ? true : task.status === filterStatus
    )

    // Изменение статуса задания
    const updateTaskStatus = (taskId: number, newStatus: ITask["status"]) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
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
                        {filteredTasks.map((task) => (
                            <ListGroup.Item key={task.id} className="mb-3">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{task.title}</Card.Title>
                                        <Card.Text>{task.description}</Card.Text>
                                        <Badge
                                            bg={
                                                task.status === "pending"
                                                    ? "warning"
                                                    : task.status === "in_progress"
                                                        ? "primary"
                                                        : "success"
                                            }
                                            className="mb-2"
                                        >
                                            {task.status === "pending"
                                                ? "Ожидает выполнения"
                                                : task.status === "in_progress"
                                                    ? "В процессе"
                                                    : "Завершено"}
                                        </Badge>
                                        <div className="d-flex gap-2">
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() =>
                                                    updateTaskStatus(task.id, "in_progress")
                                                }
                                                disabled={task.status !== "pending"}
                                            >
                                                Начать выполнение
                                            </Button>
                                            <Button
                                                variant="outline-success"
                                                size="sm"
                                                onClick={() => {
                                                    updateTaskStatus(task.id, "completed")
                                                    navigate('/execut/report')
                                                }}
                                                disabled={task.status !== "in_progress"}
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