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
import {getAuthDataFromLocalStorage} from "../../../storage/loacalStorage";

export function RolesPage(){
    const navigate = useNavigate()
    const [roles, setRoles] = useState<IRole[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const edemContext = useContext(EdembackContext)
    const {role} = getAuthDataFromLocalStorage()

    const LoadingRoles = async () => {
        try{
            setLoading(true)
            const response = await api.get(`/Roles`)
            setRoles(response.data)
            setLoading(false)
        }catch (e){
            setLoading(true)
            console.error(e)
        }
    }

    useEffect(() => {
        LoadingRoles()
    }, [])

    const filteredRoles = roles.length > 0 && roles.filter((role) =>
        String(role.salary).toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.name.toLowerCase().includes(searchQuery.toLowerCase())
    )


    return(
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            {/*<SidebarOptions title="должность" handleClick={() => navigate('/roles/create')}/>*/}
            <div className="container-fluid w-50" style={{paddingTop: "60px"}}>
                <div className="d-flex justify-content-between flex-row h-100 p-2 border-start align-items-center">
                    <h1 className="mb-3">Список должностей</h1>
                    {Number(role?.levelImportant) < 3
                        && <button
                            className="btn h-75"
                            style={{background: "#6096ba", color: "white"}}
                            onClick={() => navigate('/roles/create')}
                        >
                            Добавить должность
                    </button>}
                </div>
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
                {loading && (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </div>
                    </div>
                )}
                {filteredRoles && filteredRoles.map(role => <RoleNote role={role} onClick={(roleId) =>  navigate(`/roles/${roleId}`)} key={role.role_Id}/>)}
                { !filteredRoles && !loading && <div className="alert alert-warning">Роли отсутствуют!</div> }
            </div>
        </>
    )
}