import React, {useContext, useState} from "react";
import {IObject} from "../../models";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {useNavigate} from "react-router-dom";
import {Modal} from "../Modal";

interface ObjectProps {
    object: IObject
    onClick: (objectId: number) => void
}

export function ObjectNote({ object, onClick }: ObjectProps){
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

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

    return(
        <>
            <div
                className="card shadow-sm mb-3 hover-shadow transition-all"
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