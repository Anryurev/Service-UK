import React, {useContext} from "react";
import {IOffice, IRole} from "../../models";
import {EdembackContext} from "../../context/edemback/EdembackContext";

interface OfficeProps {
    office: IOffice
    onClick: (officeId: number) => void
}

export function OfficeNote({ office, onClick }: OfficeProps){
    const edemContext = useContext(EdembackContext)

    return(
        <>
            <div className="border px-2 py-2 rounded mb-2 d-flex justify-content-between" onClick={() => onClick(office.office_Id)}>
                <div className="mb-0 col text-start" style={{display: "inline-block"}}>{office.street + ' ' + office.house}</div>
                <div className="mb-0 col text-end">
                    <button className="btn-close" onClick={(e) => {
                        e.stopPropagation()
                        edemContext.deleteOffice(office.office_Id)
                    }}>
                    </button>
                </div>

            </div>
        </>
    )
}