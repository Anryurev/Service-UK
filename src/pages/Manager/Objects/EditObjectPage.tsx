import React, {useContext, useEffect, useState} from "react";
import {ObjectForm} from "../../../components/Object/ObjectForm";
import {useNavigate, useParams} from "react-router-dom";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {IObject, IOffice} from "../../../models";
import {Navbar} from "../../../components/Navbar";
import api from "../../../api";
import {SidebarMenu} from "../../../components/SidebarMenu";

export function EditObjectPage(){
    const { objectId } = useParams<{ objectId: string }>()
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const [offices, setOffices] = useState<IOffice[]>([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
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

    const fetchObject = async (id: number) => {
        try {
            setLoading(true)
            setError(null)

            // Очищаем форму перед загрузкой новых данных
            setFormData({
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

            // Загружаем данные
            const response = await api.get(`/Object/${id}`)
            console.log('response object', response.data)
            setFormData(response.data)

        } catch (err) {
            setError('Не удалось загрузить данные')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const LoadingOffices = async () => {
        const response = await api.get(`/Offices`)
        setOffices(response.data)
    }


    useEffect(() => {
        if (objectId) {
            const id = Number(objectId)
            if (!isNaN(id)) {
                fetchObject(id)
            }
        }
    }, [objectId])

    useEffect(() => {
        LoadingOffices()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target

        setFormData(prev => {
            if (type === 'checkbox') {
                const { checked } = e.target as HTMLInputElement
                return {
                    ...prev,
                    [name]: checked,
                }
            }
            if (name === 'office_Id' || name === 'rooms' || name === 'area') {
                return {
                    ...prev,
                    [name]: Number(value),
                }
            }
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    function isKeyOfIObject(key: string | number): key is keyof IObject {
        return key in {
            id: -1,
            office_Id: 0,
            street: "",
            house: "",
            apartment: "",
            rooms: 0,
            status: '',
            area: 0,
            kitchen: false,
            balcony: false
        }
    }

    const handleSubmit = async () => {
        let isValid = true;
        (Object.keys(formData) as Array<keyof IObject>).forEach(key => {
            const value = formData[key as keyof IObject]
            if (String(value).trim().length === 0 && isKeyOfIObject(key)) {
                isValid = false
            }
        })


        if (isValid) {
            console.log('formData n', formData)
            edemContext.updateObject(formData)
            navigate('/objects')
        }
    };

    if (loading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>
    if (!formData || formData.id !== Number(objectId)) return <div>Данные не загружены</div>


    return(
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <h1>Редактирование объекта</h1>
                {<ObjectForm
                    formData={formData}
                    offices={offices}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />}
            </div>
        </>
    )
}