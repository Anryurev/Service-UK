import React, {useContext, useState} from "react";
import {IWork} from "../../models";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {Modal} from "../Modal";
import api from "../../api";

interface WorkNoteProps{
    work: IWork
}

export function WorkNote ({work}: WorkNoteProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return(
        <>
            <div className="border px-2 py-2 rounded mb-2 d-flex justify-content-between">
                <div className="mb-0 col text-start" style={{display: "inline-block"}}>{work.name}</div>
                <div className="mb-0 col text-end">
                    <button className="btn" onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn-close" onClick={(e) => {
                        e.stopPropagation()
                        setIsModalOpen(true)
                    }}>
                    </button>
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