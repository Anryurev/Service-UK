import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import {ObjectForm} from "../../../components/Object/ObjectForm";
import {useNavigate, useParams} from "react-router-dom";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {IOffice} from "../../../models";
import api from "../../../api";

export function EditOfficePage() {
    const { officeId } = useParams<{ officeId: string }>()
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<IOffice>({
        office_Id: -1,
        street: "",
        house: ""
    })

    const fetchOffice = async (id: number) => {
        try {
            setLoading(true)
            setError(null)

            // Очищаем форму перед загрузкой новых данных
            setFormData({
                office_Id: -1,
                street: "",
                house: ""
            })

            // Загружаем данные
            const response = await api.get(`/Office/${id}`)
            console.log('response office', response.data)
            setFormData(response.data)

        } catch (err) {
            setError('Не удалось загрузить данные')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if (officeId) {
            const id = Number(officeId)
            if (!isNaN(id)) {
                fetchOffice(id)
            }
        }
    }, [officeId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setFormData(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const handleSubmit = async () => {
        let isValid = true;
        (Object.keys(formData) as Array<keyof IOffice>).forEach(key => {
            const value = formData[key as keyof IOffice]
            if (String(value).trim().length === 0) {
                isValid = false
            }
        })

        if (isValid) {
            // edemContext.updateOffice(formData)
            navigate('/objects')
        }
    };

    if (loading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>
    if (!formData || formData.office_Id !== Number(officeId)) return <div>Данные не загружены</div>

    return(
        <>
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                {/*<h1>Редактирование офиса</h1>*/}
                {/*{<ObjectForm*/}
                {/*    formData={formData}*/}
                {/*    offices={edemContext.state.offices}*/}
                {/*    onChange={handleChange}*/}
                {/*    onSubmit={handleSubmit}*/}
                {/*/>}*/}
            </div>
        </>
    )
}