import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Navbar} from "../../../components/Navbar";
import {RoleForm} from "../../../components/Role/RoleForm";
import {IRole, IWork} from "../../../models";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import api from "../../../api";
import {WorkForm} from "../../../components/Work/WorkForm";

export function EditWorkPage(){
    const { workId } = useParams<{ workId: string }>()
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState<IWork>({
        id_Work: -1,
        name: "",
        roles: [],
        roles_Id: []
    })

    const LoadingWork = async (workId: string) => {
        const response = await api.get(`/TypeWork/${workId}`)
        setFormData(response.data)
        let arrayIdRole: number[] = []
        formData.roles.map(role => {
            arrayIdRole.push(role.role_Id)
            console.log(role.role_Id)
        })
        setFormData(prev => ({
            ...prev,
            roles_Id: arrayIdRole
        }))
        console.log('get work', formData)
    }

    useEffect(() => {
        if(workId){
            LoadingWork(workId)

        } else{
            console.log('Информация о должности не загружена')
        }
    }, [workId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log('fD in form', formData)

        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleRoleChange = (roleId: number, isChecked: boolean) => {
        console.log('fD in form', formData)

        setFormData(prev => {
            const currentRoles = prev.roles.length > 0? prev.roles.map(role => role.role_Id): prev.roles_Id

            if (isChecked) {
                return {
                    ...prev,
                    roles_Id: [...currentRoles, roleId],
                    roles: []
                }
            } else {
                return {
                    ...prev,
                    roles_Id: currentRoles.filter(id => id !== roleId),
                    roles: []
                }
            }
        })
    }

    const onSubmit = async (formData: IWork): Promise<void> => {
        try {
            console.log(formData);
            await api.put(`/UpdateTypeWork`, formData);
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
    };

    return(
        <>
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <h1>Редактирование типа работ</h1>
                <WorkForm formData={formData} onChange={handleChange} handleRoleChange={handleRoleChange} onSubmit={handleSubmit}/>
            </div>
        </>
    )
}