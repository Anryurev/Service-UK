import React from "react";
import {IObject} from "../models";

interface ObjectProps {
    object: IObject
}

export function Object({ object }: ObjectProps){
    return(
        <div className="border px-2 py-2 rounded mb-2 d-flex justify-content-between">
            <p className="mb-0" style={{display: "inline-block"}}>{object.street + ' д. ' + object.house + ' кв. ' + object.apartment}</p>
            <p className="mb-0" style={{display: "inline-block"}}>{object.status}</p>
        </div>
    )
}