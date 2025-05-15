import React, {useEffect, useState} from "react";
import {IObject, IRequest, IStatus, IWork, IWorkers} from "../../models";
import {Badge, Button, Card, ListGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {log} from "util";
import api from "../../api";
import RequestCard from "./RequestCard";

interface RequestCardProps {
    onClick: () => void
    request: IRequest
    onAssign?: (requestId: number) => void
}

const RequestExecutCard: React.FC<RequestCardProps> = ({onClick, request, onAssign }) => {
    const navigate = useNavigate()
    const [currentRequest, setCurrentRequest] = useState<IRequest>(request)
    const [typeWork, setTypeWork] = useState<IWork>()
    const [object, setObject] = useState<IObject>()
    const [worker, setWorker] = useState<IWorkers>()
    const [status, setStatus] = useState<IStatus>()

    const LoadingData = async () => {
        const responseRequest = await api.get(`/Requests`)
        const responseTypeWork = await api.get(`/TypeWork/${request.type_Work}`)
        const responseObject = await api.get(`/Object/${request.object_Id}`)
        if(request.worker_Id){
            const responseWorker = await api.get(`/Worker/${request.worker_Id}`)
            setWorker(responseWorker.data)
        }
        const responseStatuses = await api.get(`/Status_Request/${request.status}`)
        setTypeWork(responseTypeWork.data)
        setObject(responseObject.data)
        setStatus(responseStatuses.data)
    }

    useEffect(() => {
        LoadingData()
    }, [])

    const updateRequestStatus = async (requestId: number, newStatus: IRequest["status"]) => {
        setCurrentRequest({...currentRequest, status: newStatus})

        console.log('currentRequest', currentRequest)

        // const updateResponse = await api.put(`/UpdateRequest`, currentRequest)
    }

    return(
        <ListGroup.Item key={request.request_Id} className="mb-3">
            <Card>
                <Card.Body>
                    {/*Тут выводится тип задания*/}
                    <Card.Title>{typeWork?.name}</Card.Title>
                    {/*Тут выводится описание задания*/}
                    <Card.Text>{request.description}</Card.Text>
                    {/*Создано Назначено В процессе Завершено*/}
                    <Badge
                        bg={
                            request.status === "1" || "2"
                                ? "primary"
                                : request.status === "3"
                                    ? "warning"
                                    : "success"
                        }
                        className="mb-2"
                    >
                        {request.status === "1" || "2"
                            ? "Ожидает выполнения"
                            : request.status === "3"
                                ? "В процессе"
                                : "Завершено"}
                    </Badge>
                    <div className="d-flex gap-2">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => updateRequestStatus(request.request_Id, "3")}
                            disabled={request.status !== "1" && request.status !== "2"}
                        >
                            Начать выполнение
                        </Button>
                        <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => {
                                updateRequestStatus(request.request_Id, "4")
                                navigate('/execut/report')
                            }}
                            disabled={request.status !== "3"}
                        >
                            Перейти к отчету
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </ListGroup.Item>
    )
}

export default RequestExecutCard