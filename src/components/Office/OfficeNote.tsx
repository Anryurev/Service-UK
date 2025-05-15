import React, {useContext, useState} from "react";
import {IOffice, IRole} from "../../models";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {Modal} from "../Modal";

interface OfficeProps {
    office: IOffice
    onClick: (officeId: number) => void
}

export function OfficeNote({ office, onClick }: OfficeProps){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const edemContext = useContext(EdembackContext)

    return(
        <>
            <div className="border px-2 py-2 rounded mb-2 d-flex justify-content-between" onClick={() => onClick(office.office_Id)}>
                <div className="mb-0 col text-start" style={{display: "inline-block"}}>{office.street + ' ' + office.house}</div>
                <div className="mb-0 col text-end">
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