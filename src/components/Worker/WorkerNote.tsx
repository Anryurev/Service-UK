import React, {useContext, useEffect, useState} from "react";
import {IWorkers} from "../../models";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {useNavigate} from "react-router-dom";
import {Modal} from "../Modal";
import api from "../../api";

interface WorkerProps{
    worker: IWorkers
    onRemove: (workerId: number) => void
    onClick: (workerId: number) => void
}

export function WorkerNote({worker, onRemove, onClick}: WorkerProps){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [roleName, setRoleName] = useState('Роль не найдена')
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const getRoleNameById = async (roleId: number) => {
        console.log('id role', roleId)
        const response = await api.get(`/Role/${roleId}`)
        const role = response.data
        console.log('role', role)
        setRoleName(role ? role.name : "Роль не найдена")
    }

    useEffect(() => {
        getRoleNameById(worker.id_Role)
    }, [roleName])

    const getRoleColor = (role: string) => {
        const colors: Record<string, string> = {
            'Директор': '#dc3545',
            'Менеджер': '#0d6efd',
            'Оператор': '#198754',
            'Администратор': '#198754',
            // 'Техник': '#fd7e14'
        }
        return colors[role] || '#6c757d'
    }

    return(
        <>
            <div
                className="card shadow-sm mb-1 hover-shadow transition-all"
                onClick={() => onClick(worker.id)}
                style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderLeft: `4px solid ${getRoleColor(roleName)}`
                }}
            >
                <div className="card-body py-2 px-3 d-flex flex-wrap align-items-center">
                    {/* ФИО */}
                    <div className="col-md-5 col-12 mb-md-0 mb-2">
                        <h6 className="card-title mb-0 text-truncate">
                            {worker.surname} {worker.name} {worker.fathername}
                        </h6>
                    </div>

                    {/* Должность */}
                    <div className="col-md-3 col-6">
                        <span className="badge bg-primary bg-opacity-10 text-primary w-100 py-2">
                            {roleName}
                        </span>
                    </div>

                    {/* Кнопки действий */}
                    <div className="col-md-4 col-12 text-md-end mt-md-0 mt-2">
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-outline-primary btn-sm me-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/worker/${worker.id}`)
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
                        edemContext.deleteWorker(worker.id)
                    }}
                >
                    Удалить
                </button>
            </>
        )}>
            <div>Удалить данного работника?</div>
        </Modal>
    </>
    )
}