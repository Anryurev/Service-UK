import React, {useContext, useEffect, useState} from "react";
import {IBooking, IObject} from "../../models";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {useNavigate} from "react-router-dom";
import {Modal} from "../Modal";
import {getAuthDataFromLocalStorage} from "../../storage/loacalStorage";
import api from "../../api";

interface ObjectProps {
    object: IObject
    onClick: (objectId: number) => void
}

export function ObjectNote({ object, onClick }: ObjectProps){
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const {worker} = getAuthDataFromLocalStorage()
    const [isOperator, setIsOperator] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isRepairMode, setIsRepairMode] = useState(false)
    const [repairDays, setRepairDays] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if(worker?.id_Role === 4){
            setIsOperator(true)
        }
    }, [])

    const handleRepairSubmit = async () => {
        if (repairDays <= 0) {
            setError('Количество дней должно быть положительным числом')
            return
        }

        if (repairDays > 365) {
            setError('Максимальный срок ремонта - 1 год')
            return
        }

        setIsLoading(true)
        setError('')

        try {
            const dateStart = new Date()
            const dateEnd = new Date()
            dateEnd.setDate(dateStart.getDate() + repairDays)

            const booking: IBooking = {
                id_Booking: -1,
                object_id: object.id,
                date_Start: dateStart.toISOString().split('T')[0],
                date_End: dateEnd.toISOString().split('T')[0],
                status: "Ремонт/Уборка"
            }

            await api.post('/Booking', booking)
            setIsRepairMode(false)
        } catch (err) {
            console.error('Error changing status:', err)
            setError('Не удалось изменить статус')
        } finally {
            setIsLoading(false)
        }
    };

    const getStatusColor = (role: string) => {
        const colors: Record<string, string> = {
            'Свободна': '#198754',
            'Бронь': '#fd7e14',
            'Сдана': '#dc3545',
            'Ремонт/Уборка': '#0d6efd',
            // 'Техник': '#fd7e14'
        };
        return colors[role] || '#6c757d'
    }

    const handleStatusChange = async (status: string) => {
        await api.patch(`/ChangeStatusObject/${object.id}?status=${status}`)
    }

    const handleStatusChangeRepair = async () => {

    }

    return(
        <>
            <div
                className="card shadow-sm mb-1 hover-shadow transition-all"
                onClick={() => onClick(object.id)}
                style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderLeft: `4px solid ${getStatusColor(object.status)}`
                }}
            >
                <div className="card-body py-2 px-3 d-flex flex-wrap align-items-center">
                    {/* Адрес */}
                    <div className="col-lg-5 col-md-6 col-12 mb-md-0 mb-2">
                        <h6 className="card-title mb-0 text-truncate">
                            ул. {object.street} д. {object.house} кв. {object.apartment}
                        </h6>
                    </div>

                    {/* Статус */}
                    <div className="col-lg-3 col-md-4 col-6">
                        <span className="badge bg-primary bg-opacity-10 text-primary w-100 py-2">
                            {object.status}
                        </span>
                    </div>


                    {/* Кнопки действий */}
                    <div className="col-lg-4 col-md-2 col-6 text-end">
                        <div className="d-flex justify-content-end">
                            {!isOperator && (
                                <>
                                    <button
                                        className="btn btn-outline-primary btn-sm me-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/object/${object.id}`)
                                        }}
                                        title="Редактировать"
                                    >
                                        <i className="bi bi-pencil"></i>
                                        <span className="d-none d-md-inline ms-1">Редактировать</span>
                                    </button>

                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsModalOpen(true)
                                        }}
                                        title="Удалить"
                                    >
                                        <i className="bi bi-trash"></i>
                                        <span className="d-none d-md-inline ms-1">Удалить</span>
                                    </button>
                                </>
                            )}
                            {isOperator && (
                                <div className="dropdown">
                                    <button
                                        className="btn btn-outline-primary btn-sm dropdown-toggle"
                                        type="button"
                                        id="statusDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        onClick={(e) => e.stopPropagation()}
                                        title="Изменить статус бронирования"
                                    >
                                        <i className="bi bi-pencil"></i>
                                        <span className="d-none d-md-inline ms-1">Изменить статус</span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="statusDropdown">
                                        <li className="list-group-item border-0 p-0">
                                            {isRepairMode ? (
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="flex-grow-1">
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            max="365"
                                                            value={repairDays}
                                                            onChange={(e) => {
                                                                const value = parseInt(e.target.value);
                                                                setRepairDays(isNaN(value) ? 0 : value);
                                                                setError('');
                                                            }}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className={`form-control form-control-sm ${error ? 'is-invalid' : ''}`}
                                                            disabled={isLoading}
                                                        />
                                                        {error && <div className="invalid-feedback">{error}</div>}
                                                    </div>
                                                    <div className="d-flex gap-1">
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                setIsRepairMode(false)
                                                            }}
                                                            disabled={isLoading}
                                                        >
                                                            <i className="bi bi-x-lg"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-primary"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleRepairSubmit()
                                                            }}
                                                            disabled={isLoading}
                                                        >
                                                            {isLoading ? (
                                                                <span className="spinner-border spinner-border-sm" role="status"></span>
                                                            ) : (
                                                                <i className="bi bi-check-lg"></i>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    className="dropdown-item d-flex align-items-center"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setIsRepairMode(true)
                                                    }}
                                                >
                                                    <i className="bi bi-tools me-2"></i>
                                                    Ремонт/Уборка
                                                </button>
                                            )}
                                        </li>
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleStatusChange('Свободна')
                                                }}
                                            >
                                                Свободна
                                            </button>

                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={"Подтвердить удаление"} footer={(
                <>
                    <button
                        type="button"
                        className="btn text-white"
                        style={{ background: "#8b8c89" }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        Закрыть
                    </button>
                    <button
                        type="submit"
                        className="btn btn-danger"
                        onClick={() => {
                            edemContext.deleteObject(object.id)
                        }}
                    >
                        Удалить
                    </button>
                </>
            )}>
                <div>Удалить данный объект?</div>
            </Modal>
        </>
    )
}