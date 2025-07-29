import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {IObject, IOffice} from "../../../models";
import {useNavigate} from "react-router-dom";
import {ObjectForm} from "../../../components/Object/ObjectForm";
import api from "../../../api";
import {SidebarMenu} from "../../../components/SidebarMenu";

export function CreateObjectPage(){
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const [offices, setOffices] = useState<IOffice[]>([])
    const [validated, setValidated] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formData, setFormData] = useState<IObject>({
        id: -1,
        office_Id: 0,
        street: "",
        house: "",
        apartment: "",
        rooms: 0,
        status: 'Свободна',
        area: 0,
        kitchen: false,
        balcony: false
    })

    const LoadingOffices = async () => {
        const response = await api.get(`/Offices`)
        setOffices(response.data)
    }

    useEffect(() => {
        LoadingOffices()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target

        if(name === 'office_Id' || name === 'rooms' || name === 'area'){
            setFormData(prev => ({
                ...prev,
                [name]: Number(value)
            }))
        } else if (name === "kitchen" || name === "balcony") {
            setFormData(prev => ({
                ...prev,
                [name]: !prev[name]
            }))
        } else{
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    function onSubmit(formData: IObject) {
        edemContext.createObject(formData)
        navigate('/objects')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setValidated(true)
        e.stopPropagation()

        const newErrors: Record<string, string> = {}

        // Проверка обязательных полей
        if (!formData.street.trim()) newErrors.street = "Название улицы обязательно"
        if (!formData.house.trim()) newErrors.house = "Номер дома обязателен"
        if (!formData.rooms || formData.rooms === 0) newErrors.rooms = "Количество комнат обязательно"
        if (!formData.area || formData.area === 0) newErrors.area = "Площадь объекта обязательна"
        if (!formData.office_Id) newErrors.office_Id = "Выберите офис"

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            try {
                await edemContext.createObject(formData)
                navigate('/objects')
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
                <h1>Создание нового объекта</h1>
                <ObjectForm
                    formData={formData}
                    offices={offices}
                    isNotEditMode={true}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    )
}