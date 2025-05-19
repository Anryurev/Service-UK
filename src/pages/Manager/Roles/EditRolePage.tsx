import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Navbar} from "../../../components/Navbar";
import {RoleForm} from "../../../components/Role/RoleForm";
import {IRole} from "../../../models";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import api from "../../../api";

export function EditRolePage(){
    const { roleId } = useParams<{ roleId: string }>()
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState<IRole>({
        role_Id: -1,
        name: "",
        salary: 0,
        add_Parametrs: [{
            id_Parametr: -1,
            role_Id: -1,
            parametr: ""
        }]
    })

    const LoadingRole = async (roleId: string) => {
        const response = await api.get(`/Role/${roleId}`)
        setFormData(response.data)
    }

    useEffect(() => {
        if(roleId){
            LoadingRole(roleId)

        } else{
            console.log('Информация о должности не загружена')
        }
    }, [roleId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if(name === 'salary'){
            setFormData(prev => ({
                ...prev,
                [name]: Number(value)
            }))
        } else{
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleChangeAddParametrList = (newParametrsList: Array<{
        id_Parametr: number,
        role_Id: number,
        parametr: string
    }>) => {
        setFormData(prev => ({
            ...prev,
            add_Parametrs: newParametrsList
        }))
    }

    function onSubmit(formData: IRole) {
        console.log(formData)
        edemContext.updateRole(formData)
        navigate('/roles')
    }

    const handleSubmit = async () => {
        let isValid = true;
        (Object.keys(formData) as Array<keyof IRole>).forEach(key => {
            const value = formData[key as keyof IRole] // Явное приведение типа ключа
            if (String(value).trim().length === 0) {
                isValid = false
            }
        })

        if(isValid) onSubmit(formData)
    }

    return(
        <>
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <h1>Редактирование должности</h1>
                <RoleForm
                    formData={formData}
                    onChange={handleChange}
                    onChangeParamList={handleChangeAddParametrList}
                    onSubmit={handleSubmit}/>
            </div>
        </>
    )
}