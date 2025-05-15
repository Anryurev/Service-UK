import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {Navbar} from "../../../components/Navbar";
import {RoleNote} from "../../../components/Role/RoleNote";
import {SidebarMenu} from "../../../components/SidebarMenu";
import {SidebarOptions} from "../../../components/SidebarOptions";
import api from "../../../api";
import {IRole} from "../../../models";

export function RolesPage(){
    const navigate = useNavigate()
    const [roles, setRoles] = useState<IRole[]>([])
    const edemContext = useContext(EdembackContext)

    const LoadingRoles = async () => {
        const response = await api.get(`/Roles`)
        console.log('Get all roles', response.data)
        setRoles(response.data)
    }

    useEffect(() => {
        LoadingRoles()
    }, [])


    return(
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <SidebarOptions handleClick={() => navigate('/roles/create')}/>
            <div className="container-fluid w-50" style={{paddingTop: "60px"}}>
                <h1 className="mb-3">Должности</h1>
                <div className="border px-2 py-2 rounded mb-2 d-flex justify-content-between">
                    <div className="mb-0 col text-start" style={{display: "inline-block"}}><strong>Должность</strong></div>
                    <div className="mb-0 col text-center" style={{display: "inline-block"}}><strong>Ставка</strong></div>
                    <div className="mb-0 col"></div>

                </div>
                {roles.map(role => <RoleNote role={role} key={role.role_Id}/>)}
            </div>
        </>
    )
}