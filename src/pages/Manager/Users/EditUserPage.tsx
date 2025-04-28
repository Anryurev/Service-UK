import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Navbar} from "../../../components/Navbar";
import {EdembackContext} from "../../../context/edemback/EdembackContext";
import {IUsers} from "../../../models";
import {WorkerForm} from "../../../components/Worker/WorkerForm";
import api from "../../../api";

export function EditUserPage() {
    const { userId } = useParams<{ userId: string }>()
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
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
        password: "",
    })

    const fetchUser = async (id: number) => {
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
            console.log('response user', response.data[0])
            setFormData(response.data)

        } catch (err) {
            setError('Не удалось загрузить данные')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (userId) {
            const id = Number(userId)
            if (!isNaN(id)) {
                fetchUser(id)
            }
        }
    }, [userId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setFormData(prev => {
            if (name === 'id_Role' || name === 'id_Office') {
                return {
                    ...prev,
                    [name]: Number(value),
                };
            }
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const handleSubmit = async () => {
        let isValid = true;
        (Object.keys(formData) as Array<keyof IUsers>).forEach(key => {
            const value = formData[key as keyof IUsers]
            if (String(value).trim().length === 0) {
                isValid = false
            }
        })

        if (isValid) {
            console.log('submit', formData)
            edemContext.updateUser(formData)
            navigate('/Users')
        }
    }

    if (loading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>
    if (!formData || formData.id !== Number(userId)) return <div>Данные не загружены</div>

    return(
        <>
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <h1>Редактирование пользователя</h1>
                {<WorkerForm
                    formData={formData}
                    roles={edemContext.state.roles}
                    offices={edemContext.state.offices}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />}
            </div>
        </>
    )
}