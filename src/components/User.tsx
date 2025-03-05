import React from "react";
import {IUsers} from "../models";

interface UserProps{
    user: IUsers
}

export function User({user}: UserProps){
    return(
        <div className="border px-2 py-2 rounded mb-2 d-flex justify-content-between">
            <p className="mb-0" style={{display: "inline-block"}}>{user.name.firstname + ' ' + user.name.lastname}</p>
            <p className="mb-0" style={{display: "inline-block"}}>{user.address.city + ' ' + user.address.street}</p>
        </div>
    )
}