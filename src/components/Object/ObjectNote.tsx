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

    return(
        <>
            <div className="border px-2 py-2 rounded mb-2 d-flex justify-content-between" onClick={() => onClick(object.id)}>
                <div className="mb-0 col text-start" style={{display: "inline-block"}}>{object.street + ' д. ' + object.house + ' кв. ' + object.apartment}</div>
                <div className="mb-0 col text-center" style={{display: "inline-block"}}>{object.status}</div>
                <div className="mb-0 col text-end">
                    <button className="btn" onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/object/${object.id}`)
                    }}>
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn-close" onClick={(e) => {
                        e.stopPropagation()
                        setIsModalOpen(true)
                        // e.stopPropagation()
                        // edemContext.deleteObject(object.id)
                    }}>
                    </button>
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