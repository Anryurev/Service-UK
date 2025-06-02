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

    const handleSubmit = async () => {
        let isValid = true;
        (Object.keys(formData) as Array<keyof IObject>).forEach(key => {
            const value = formData[key as keyof IObject] // Явное приведение типа ключа
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
                <h1>Создание нового объекта</h1>
                <ObjectForm formData={formData} offices={offices} onChange={handleChange} onSubmit={handleSubmit}/>
            </div>
        </>
    )
}