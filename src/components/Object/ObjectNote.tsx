import React, {useContext} from "react";
import {IObject} from "../../models";
import {EdembackContext} from "../../context/edemback/EdembackContext";

interface ObjectProps {
    object: IObject
    onClick: (objectId: number) => void
}

export function ObjectNote({ object, onClick }: ObjectProps){
    const edemContext = useContext(EdembackContext)

    return(
        <div className="border px-2 py-2 rounded mb-2 d-flex justify-content-between" onClick={() => onClick(object.id)}>
            <p className="mb-0 text-start" style={{display: "inline-block"}}>{object.street + ' д. ' + object.house + ' кв. ' + object.apartment}</p>
            <p className="mb-0" style={{display: "inline-block"}}>{object.status}</p>
            <button className="btn-close" onClick={(e) => {
                e.stopPropagation()
                edemContext.deleteObject(object.id)
            }}>
            </button>
        </div>
    )
}