import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Navbar} from "../../../components/Navbar";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {IWorkers} from "../../../models";
import {WorkerForm} from "../../../components/Worker/WorkerForm";
import api from "../../../api";
import {SidebarMenu} from "../../../components/SidebarMenu";

export function EditWorkerPage() {
    const { workerId } = useParams<{ workerId: string }>()
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
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
        password: "",
    })

    const LoadingData = async () => {
        await edemContext.getAllRoles()
        await edemContext.getAllOffices()
    }

    useEffect(() => {
        LoadingData()
    }, [])

    const fetchWorker = async (id: number) => {
        try {
            setLoading(true)
            setError(null)

            // Очищаем форму перед загрузкой новых данных
            setFormData({
                id: -1,
                name: "",
                surname: "",
                fathername: "",
                phoneNumber: "",
                email: "",
                birthday: "",
                id_Role: 0,
                id_Office: 0,
                password: "",
            })

            // Загружаем данные
            const response = await api.get(`/Worker/${id}`)
            console.log('response worker', response.data)
            setFormData({
                ...response.data,
                password: ""
            })

        } catch (err) {
            setError('Не удалось загрузить данные')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const cleanPhoneNumber = (formattedPhone: string): string => {
        // Удаляем всё, кроме цифр и +
        return formattedPhone.replace(/[^\d+]/g, '')
    }

    useEffect(() => {
        if (workerId) {
            const id = Number(workerId)
            if (!isNaN(id)) {
                fetchWorker(id)
            }
        }
    }, [workerId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setFormData(prev => {
            if (name === 'id_Role' || name === 'id_Office') {
                return {
                    ...prev,
                    [name]: Number(value),
                }
            } else if(name === 'phoneNumber'){
                setFormData(prev => ({
                    ...prev,
                    [name]: cleanPhoneNumber(value)
                }))

            }
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const handleSubmit = async () => {
        let isValid = true;
        (Object.keys(formData) as Array<keyof IWorkers>).forEach(key => {
            if (key === 'password') return
            const value = formData[key as keyof IWorkers]
            if (String(value).trim().length === 0) {
                isValid = false
            }
        })

        if (isValid) {
            console.log('submit', formData)
            edemContext.updateWorker(formData)
            navigate('/Workers')
        } else {
            console.log('Не прошло валидацию')
        }
    }

    if (loading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>
    if (!formData || formData.id !== Number(workerId)) return <div>Данные не загружены</div>

    return(
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <h1>Редактирование пользователя</h1>
                {<WorkerForm
                    formData={formData}
                    roles={edemContext.state.roles}
                    offices={edemContext.state.offices}
                    isNotEditMode={false}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />}
            </div>
        </>
    )
}