import React, {useContext, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {IObject} from "../../../models";
import {useNavigate} from "react-router-dom";
import {ObjectForm} from "../../../components/Object/ObjectForm";

export function CreateObjectPage(){
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState<IObject>({
        id: -1,
        office_Id: 0,
        street: "",
        house: "",
        apartment: "",
        rooms: 0,
        status: 'Свободно',
        area: 0,
        kitchen: false,
        balcony: false
    })

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
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <h1>Создание нового объекта</h1>
                <ObjectForm formData={formData} offices={edemContext.state.offices} onChange={handleChange} onSubmit={handleSubmit}/>
            </div>
        </>
    )
}