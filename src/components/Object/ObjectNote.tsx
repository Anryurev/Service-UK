import React, {useContext} from "react";
import {IObject} from "../../models";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {useNavigate} from "react-router-dom";

interface ObjectProps {
    object: IObject
    onClick: (objectId: number) => void
}

export function ObjectNote({ object, onClick }: ObjectProps){
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()

    return(
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
                    edemContext.deleteObject(object.id)
                }}>
                </button>
            </div>
        </div>
    )
}