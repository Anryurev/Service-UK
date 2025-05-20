import React, {useContext, useState} from "react";
import {IWork} from "../../models";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {Modal} from "../Modal";
import api from "../../api";
import {useNavigate} from "react-router-dom";

interface WorkNoteProps{
    work: IWork,
    onClick: (workId: number) => void,
}

export function WorkNote ({work, onClick}: WorkNoteProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()

    return(
        <>
            <div
                className="card shadow-sm mb-3 hover-shadow transition-all"
                onClick={() => onClick(work.id_Work)}
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
                            {work.name}
                        </h6>
                    </div>


                    {/* Кнопки действий */}
                    <div className="col-lg-4 col-md-2 col-6 text-end">
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-outline-primary btn-sm me-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/work/${work.id_Work}`)
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
                        onClick={async () => {
                            // await api.delete(``)
                            setIsModalOpen(false)
                        }}
                    >
                        Удалить
                    </button>
                </>
            )}>
                <div>Удалить данный тип работы?</div>
            </Modal>
        </>
    )
}