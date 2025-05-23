import React, {useContext, useState} from "react";
import { IRole} from "../../models";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {Modal} from "../Modal";
import {useNavigate} from "react-router-dom";

interface RoleProps {
    role: IRole
    onClick: (roleId: number) => void
}

export function RoleNote({ role, onClick }: RoleProps){
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

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
                onClick={() => onClick(role.role_Id)}
                style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderLeft: `4px solid ${getRoleColor(role.name)}`
                }}
            >
                <div className="card-body py-2 px-3 d-flex flex-wrap align-items-center">
                    {/* Название должности */}
                    <div className="col-lg-5 col-md-6 col-12 mb-md-0 mb-2">
                        <h6 className="card-title mb-0 text-truncate">
                            {role.name}
                        </h6>
                    </div>

                    {/* Ставка */}
                    <div className="col-lg-3 col-md-4 col-6">
                        <span className="badge bg-primary bg-opacity-10 text-primary w-100 py-2">
                            {role.salary}
                        </span>
                    </div>


                    {/* Кнопки действий */}
                    <div className="col-lg-4 col-md-2 col-6 text-end">
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-outline-primary btn-sm me-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/role/${role.role_Id}`)
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
                        className="btn btn-secondary text-white"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Закрыть
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                            edemContext.deleteRole(role.role_Id)
                            setIsModalOpen(false)
                        }}
                    >
                        Удалить
                    </button>
                </>
            )}>
                <div>Удалить данную должность?</div>
            </Modal>
        </>
    )
}