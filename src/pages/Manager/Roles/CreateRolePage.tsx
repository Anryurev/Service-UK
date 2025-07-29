import React, {useContext, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {useNavigate} from "react-router-dom";
import {IRole} from "../../../models";
import {RoleForm} from "../../../components/Role/RoleForm";
import {SidebarMenu} from "../../../components/SidebarMenu";

export function CreateRolePage(){
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
        }],
        levelImportant: 4
    });

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
        edemContext.createRole(formData)
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

    return (
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <h1>Создание новой должности</h1>
                <RoleForm
                    formData={formData}
                    onChange={handleChange}
                    onChangeParamList={handleChangeAddParametrList}
                    isNotEditMode={true}
                    onSubmit={handleSubmit}/>
            </div>
        </>
    )
}