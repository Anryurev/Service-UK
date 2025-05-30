import React, {useEffect, useState} from "react";
import {IRole, IWork} from "../../../models";
import api from "../../../api";
import {Navbar} from "../../../components/Navbar";
import {useNavigate} from "react-router-dom";
import {log} from "util";
import {WorkForm} from "../../../components/Work/WorkForm";

export function CreateWorkPage(){
    const navigate = useNavigate()
    const [roles, setRoles] = useState<IRole[]>([])
    const [formData, setFormData] = useState<IWork>({
        id_Work: -1,
        name: "",
        roles: [],
        roles_Id: []
    })

    const LoadingData = async () => {
        const responseRoles = await api.get(`/Roles/NoImportant`)
        setRoles(responseRoles.data)
    }

    useEffect(() => {
        LoadingData()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleRoleChange = (roleId: number, isChecked: boolean) => {
        setFormData(prev => {
            const currentRoles = prev.roles_Id || []
            if (isChecked) {
                return {
                    ...prev,
                    roles_Id: [...currentRoles, roleId]
                }
            } else {
                return {
                    ...prev,
                    roles_Id: currentRoles.filter(id => id !== roleId)
                }
            }
        })
    }

    const onSubmit = async (formData: IWork): Promise<void> => {
        try {
            console.log(formData);
            await api.post(`/TypeWork`, formData);
            navigate('/works');
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
            // Можно добавить обработку ошибок (например, показать уведомление)
        }
    };

    const handleSubmit = (): void => {
        console.log('formData handleSubmit', formData)
        const isValid = ((): boolean => {
            // Проверяем name
            const isNameValid = String(formData.name).trim().length > 0;

            // Проверяем roles_Id
            const isRolesIdValid = Array.isArray(formData.roles_Id) && formData.roles_Id.length > 0;

            return isNameValid && isRolesIdValid;
        })()

        if (isValid) {
            onSubmit(formData);
        } else {
            console.error('Заполните все обязательные поля');
            // Можно добавить отображение ошибки пользователю
        }
    }

    return(
        <>
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <h1>Создание нового типа работы</h1>
                
                <WorkForm formData={formData} onChange={handleChange} handleRoleChange={handleRoleChange} onSubmit={handleSubmit}/>
            </div>
        </>
    )
}