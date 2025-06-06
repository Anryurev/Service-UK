import React, { useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {useNavigate} from "react-router-dom";
import {IObject, IRequest, IRole, IStatus, IWorkers, RoleItem} from "../../../models";
import {useParams} from "react-router-dom";
import api from "../../../api";
import {getAuthDataFromLocalStorage} from "../../../storage/loacalStorage";
import { Container, Card, Badge, ListGroup, Button, Row, Col} from "react-bootstrap";

export function RequestPage() {
    const { requestId } = useParams<{ requestId: string }>()
    const [request, setRequest] = useState<IRequest>()
    const [object, setObject] = useState<IObject>()
    const [roles, setRoles] = useState<IRole[]>([])
    const [workersRequest, setWorkersRequest] = useState<IWorkers[]>()
    const {worker, role} = getAuthDataFromLocalStorage()
    const navigate = useNavigate()

    const LoadingData = async (request: IRequest) => {
        console.log('request log', request)
        const responseObject = await api.get(`/Object/${request.object_Id}`)
        fetchRoles(request.roles_Id || [])
        if(request.workers_Id){
            fetchWorkers(request.workers_Id || [])
        }
        setObject(responseObject.data)
    }

    useEffect(() => {
        if (request) LoadingData(request)
    }, [request])

    const fetchRoles = async (roleItems: RoleItem[]) => {
        const results = await Promise.all(
            roleItems.map(async (item) => {
                const res = await api.get<IRole>(`/Role/${item.role}`)
                return res.data
            })
        )
        setRoles(results)
    }

    const fetchWorkers = async (workers_Id: number[]) => {
        console.log('fetchWorkers')
        const results= await Promise.all(
            workers_Id.map(async workerId => {
                const res = await api.get<IWorkers>(`/Worker/${workerId}`)
                return res.data
            })
        )
        setWorkersRequest(results)
    }

    useEffect(() => {
        const fetchResponse = async () => {
            const response = await api.get(`/Request/${requestId}`)
            setRequest(response.data)
        }

        fetchResponse()
    }, [])


    const removeClick = async (request_Id: number | undefined) => {
        await api.delete(`/Request/${request_Id}`)
    }

    const updateRequestStatus = async (newStatus: IStatus) => {
        try {
            console.log('newStatus', newStatus)
            await api.patch(`/ChangeStatusRequest/${request?.request_Id}?status=${newStatus.name}`)
        } catch (error) {
            console.error('Ошибка при обновлении статуса:', error)
        }
    }

    const getStatusBadge = () => {
        console.log(request?.status)
        switch(request?.status) {
            case "Создано": return "danger"
            case "Назначено": return "primary"
            case "В процессе": return  "warning"
            case "Выполнено": return "success"
            default: return "secondary"
        }
    }

    const statusBadge = getStatusBadge()

    return (
        <>
            <Navbar />
            <Container className="mt-4" style={{ paddingTop: '60px' }}>
                <Card className="shadow-sm">
                    <Card.Header className="bg-white border-bottom-0">
                        <Row className="align-items-center">
                            <Col>
                                <h2 className="mb-0">
                                    <strong>Задание:</strong> {request?.type_Work}
                                </h2>
                            </Col>
                            <Col xs="auto">
                                <Badge
                                    bg={request?.urgency ? "danger" : "secondary"}
                                    className="fs-6"
                                >
                                    {request?.urgency ? "Срочно" : "Не срочно"}
                                </Badge>
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body>
                        <Row>
                            <Col md={8}>
                                <ListGroup variant="flush" className="mb-4">
                                    <ListGroup.Item className="d-flex">
                                        <span className="fw-bold me-2" style={{ minWidth: '100px' }}>Объект:</span>
                                        <span>
                                          ул. {object?.street}, д. {object?.house}, кв. {object?.apartment}
                                        </span>
                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex">
                                        <span className="fw-bold me-2" style={{ minWidth: '100px' }}>Должность:</span>
                                        {roles.map(role => (<span key={role.role_Id}>{role.name} </span>))}
                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex">
                                        <span className="fw-bold me-2" style={{ minWidth: '100px' }}>Работник:</span>
                                        <span>
                                          {workersRequest ? workersRequest.map(workerRequest => (`${workerRequest.surname} ${workerRequest.name} ${workerRequest?.fathername || ''}`))  : 'Для всех работников'}
                                        </span>
                                    </ListGroup.Item>

                                    <ListGroup.Item className="d-flex">
                                        <span className="fw-bold me-2" style={{ minWidth: '100px' }}>Статус:</span>
                                        <Badge bg={statusBadge} className="align-self-center">
                                            {request?.status}
                                        </Badge>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <div className="fw-bold mb-2">Описание:</div>
                                        <div className="border rounded p-3 bg-light">
                                            {request?.description || "Описание отсутствует"}
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>

                                {/* Блок для фотографий */}
                                {request?.photos && request.photos.length > 0 && (
                                    <div className="mb-4">
                                        <h5 className="fw-bold mb-3">Фотографии</h5>
                                        <div className="d-flex flex-wrap gap-3">
                                            {request.photos.map((photo, index) => (
                                                <img
                                                    key={index}
                                                    src={`/images/${photo.url}`}
                                                    alt={`Фото задания ${index + 1}`}
                                                    className="img-thumbnail"
                                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </Col>
                        </Row>

                        {/* Кнопки действий */}
                        <div className="d-flex justify-content-between mt-4">
                            {role?.levelImportant && role.levelImportant < 4 ? (
                                <>
                                    <Button variant="outline-primary" size="sm">
                                        Редактировать
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => {
                                            request && removeClick(request.request_Id)
                                            navigate(`/request/object`)
                                        }}
                                    >
                                        Отменить задание
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateRequestStatus({ id_status: 3, name: "В процессе" });
                                        navigate(`/execut/report/${requestId}`);
                                    }}
                                >
                                    Перейти к выполнению задания
                                </Button>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}