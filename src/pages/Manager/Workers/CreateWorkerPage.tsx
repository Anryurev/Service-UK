import React, {useContext, useEffect, useState} from "react";
import {WorkerForm} from "../../../components/Worker/WorkerForm";
import {IWorkers} from "../../../models";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {Navbar} from "../../../components/Navbar";
import {useNavigate} from "react-router-dom";
import {SidebarMenu} from "../../../components/SidebarMenu";

export function CreateWorkerPage() {
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formData, setFormData] = useState<IWorkers>({
        id: -1,
        name: "",
        surname: "",
        fathername: "",
        phoneNumber: "",
        email: "",
        birthday: "",
        id_Role: 0,
        id_Office: 0,
        password: ""
    })

    const LoadingData = async () => {
        await edemContext.getAllRoles()
        await edemContext.getAllOffices()
    }

    useEffect(() => {
        LoadingData()
    }, [])

    const cleanPhoneNumber = (formattedPhone: string): string => {
        // Удаляем всё, кроме цифр и +
        return formattedPhone.replace(/[^\d+]/g, '')
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target

        if(name === 'id_Role' || name === 'id_Office'){
            setFormData(prev => ({
                ...prev,
                [name]: Number(value)
            }))
        } else if(name === 'phoneNumber'){
            setFormData(prev => ({
                ...prev,
                [name]: cleanPhoneNumber(value)
            }))

        }
        else{
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setValidated(true)
        e.stopPropagation()

        const newErrors: Record<string, string> = {}

        // Проверка обязательных полей
        if (!formData.name.trim()) newErrors.name = "Имя обязательно"
        if (!formData.surname.trim()) newErrors.surname = "Фамилия обязательна"
        if (!formData.email.trim()) newErrors.email = "Email обязателен"
        if (!formData.phoneNumber.trim() || formData.phoneNumber.replace(/\D/g, '').length < 11) {
            newErrors.phoneNumber = "Введите корректный номер телефона"
        }
        if (!formData.password.trim()) newErrors.password = "Пароль обязателен"
        if (!formData.birthday) newErrors.birthday = "Дата рождения обязательна"
        if (!formData.id_Role) newErrors.id_Role = "Выберите роль"
        if (!formData.id_Office) newErrors.id_Office = "Выберите офис"

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            try {
                await edemContext.createWorker(formData)
                navigate('/workers')
            } catch (error) {
                console.error('Ошибка при создании сотрудника:', error)
            }
        } else {
            setErrors(newErrors)
        }
    }

    return (
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
                <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                    <h1>Создание нового сотрудника</h1>
                    <WorkerForm
                        formData={formData}
                        offices={edemContext.state.offices}
                        roles={edemContext.state.roles}
                        isNotEditMode={true}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </div>
        </>
    )
}