import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {Navbar} from "../../../components/Navbar";
import {RoleNote} from "../../../components/Role/RoleNote";
import {SidebarMenu} from "../../../components/SidebarMenu";
import {SidebarOptions} from "../../../components/SidebarOptions";
import api from "../../../api";
import {IRole} from "../../../models";
import {Form} from "react-bootstrap";

export function RolesPage(){
    const navigate = useNavigate()
    const [roles, setRoles] = useState<IRole[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const edemContext = useContext(EdembackContext)

    const LoadingRoles = async () => {
        const response = await api.get(`/Roles`)
        console.log('Get all roles', response.data)
        setRoles(response.data)
    }

    useEffect(() => {
        LoadingRoles()
    }, [])

    const filteredRoles = roles.filter((role) =>
        String(role.salary).toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.name.toLowerCase().includes(searchQuery.toLowerCase())
    )


    return(
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <SidebarOptions title="должность" handleClick={() => navigate('/roles/create')}/>
            <div className="container-fluid w-50" style={{paddingTop: "60px"}}>
                <h1 className="mb-3">Должности</h1>
                <Form.Group className="mb-4">
                    <Form.Label>Поиск по должностям:</Form.Label>
                    <Form.Control
                        type="text"
                        value={searchQuery}
                        placeholder="Поиск должностей"
                        onChange={(e) =>
                            setSearchQuery(e.target.value)
                        }
                    >
                    </Form.Control>
                </Form.Group>
                <div className="border px-2 py-2 rounded mb-2 d-flex justify-content-between">
                    <div className="mb-0 col text-start" style={{display: "inline-block"}}><strong>Должность</strong></div>
                    <div className="mb-0 col text-center" style={{display: "inline-block"}}><strong>Ставка</strong></div>
                    <div className="mb-0 col"></div>

                </div>
                {filteredRoles.map(role => <RoleNote role={role} onClick={(roleId) =>  navigate(`/roles/${roleId}`)} key={role.role_Id}/>)}
            </div>
        </>
    )
}