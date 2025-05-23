import React, {useContext, useState} from "react";
import {IOffice, IRole} from "../../models";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {Modal} from "../Modal";
import {useNavigate} from "react-router-dom";

interface OfficeProps {
    office: IOffice
    onClick: (officeId: number) => void
}

export function OfficeNote({ office, onClick }: OfficeProps){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()

    return(
        <>
            <div
                className="card shadow-sm mb-1 hover-shadow transition-all"
                onClick={() => onClick(office.office_Id)}
                style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderLeft: `4px solid`
                }}
            >
                <div className="card-body py-2 px-3 d-flex flex-wrap align-items-center">
                    {/* Адресс */}
                    <div className="col-lg-8 col-md-6 col-12 mb-md-0 mb-2">
                        <h6 className="card-title mb-0 text-truncate">
                            ул. {office.street} д. {office.house}
                        </h6>
                    </div>


                    {/* Кнопки действий */}
                    <div className="col-lg-4 col-md-2 col-6 text-end">
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-outline-primary btn-sm me-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/office/${office.office_Id}`)
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
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                            edemContext.deleteOffice(office.office_Id)
                            setIsModalOpen(false)
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