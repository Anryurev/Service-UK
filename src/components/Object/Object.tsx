import React, {useContext} from "react";
import {IObject} from "../../models";
import {EdembackContext} from "../../context/edemback/EdembackContext";

interface ObjectProps {
    object: IObject
    onRemove: (objectId: number) => void
    onClick: (objectId: number) => void
}

export function Object({ object, onRemove, onClick }: ObjectProps){
    const edemContext = useContext(EdembackContext)

    return(
        <div className="border px-2 py-2 rounded mb-2 d-flex justify-content-between" onClick={() => onClick(object.id)}>
            <p className="mb-0" style={{display: "inline-block"}}>{object.street + ' д. ' + object.house + ' кв. ' + object.apartment}</p>
            <p className="mb-0" style={{display: "inline-block"}}>{object.status}</p>
            <button className="btn btn-danger p-1" onClick={(e) => {
                e.stopPropagation()
                // onRemove(object.id)
                edemContext.deleteObject(object.id)
                console.log(edemContext.state.objects)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x"
                     viewBox="0 0 16 16">
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        </div>
    )
}