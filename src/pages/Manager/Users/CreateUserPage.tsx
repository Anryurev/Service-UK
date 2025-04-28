import React, {useContext, useEffect, useState} from "react";
import {WorkerForm} from "../../../components/Worker/WorkerForm";
import {IRole, IUsers} from "../../../models";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {Navbar} from "../../../components/Navbar";
import {Form} from "react-bootstrap"
import type { FormControlProps } from 'react-bootstrap';

export function CreateUserPage() {
    const edemContext = useContext(EdembackContext)
    const [formData, setFormData] = useState<IUsers>({
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

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target

        if(name === 'id_Role' || name === 'id_Office'){
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

    function onSubmit(formData: IUsers) {
        console.log(formData)
        edemContext.createUser(formData)
    }

    const handleSubmit = async () => {
        let isValid = true;
        (Object.keys(formData) as Array<keyof IUsers>).forEach(key => {
            const value = formData[key as keyof IUsers] // Явное приведение типа ключа
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
                    <h1>Создание нового пользователя</h1>
                    <WorkerForm
                        formData={formData}
                        offices={edemContext.state.offices}
                        roles={edemContext.state.roles}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </div>
        </>
    )
}