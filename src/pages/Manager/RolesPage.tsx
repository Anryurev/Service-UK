import React, {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {Navbar} from "../../components/Navbar";
import {RoleNote} from "../../components/Role/RoleNote";
import {SidebarMenu} from "../../components/SidebarMenu";
import {SidebarOptions} from "../../components/SidebarOptions";

export function RolesPage(){
    const navigate = useNavigate()
    const edemContext = useContext(EdembackContext)

    useEffect(() => {
        edemContext.getAllRoles()
        console.log(edemContext.state.roles)
        // eslint-disable-next-line
    }, [])


    return(
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <SidebarOptions/>
            <div className="container-fluid w-50" style={{paddingTop: "60px"}}>
                <h1 className="mb-3">Должности</h1>
                <div className="border px-2 py-2 rounded mb-2 d-flex justify-content-between">
                    <div className="mb-0 col text-start" style={{display: "inline-block"}}><strong>Должность</strong></div>
                    <div className="mb-0 col text-center" style={{display: "inline-block"}}><strong>Ставка</strong></div>
                    <div className="mb-0 col"></div>

                </div>
                {edemContext.state.roles.map(role => <RoleNote role={role} key={role.role_Id}/>)}
                <button type="button" className="btn" style={{backgroundColor: "#6096ba"}}>Добавить должность</button>
            </div>

        </>
    )
}