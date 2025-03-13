import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {IUsers} from "../models";
import {Navbar} from "../components/Navbar";
import axios from "axios";

export function UserPage(){
    const { userId } = useParams<{ userId: string }>()
    const [isEditingMod, setIsEditingMod] = useState(false)
    const [user, setUser] = useState<IUsers>({
        address: {
            geolocation: {
                lat: "",
                long: ""
            },
            city: "",
            street: "",
            number: 0,
            zipcode: ""
        },
        id: 0,
        email: "",
        username: "",
        password: "",
        name: {
            firstname: "",
            lastname: ""
        },
        phone: "",
        v: 0
    })

    async function fetchUsers(){
        const response = await axios.get<IUsers>(`https://fakestoreapi.com/users/${userId}`)
        setUser(response.data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleEditUser = () => {
        setIsEditingMod(true)
    }

    const handleRemoveUser = async () => {
        const response = await axios.get<IUsers>(`https://fakestoreapi.com/users`)

    }

    return(
        <>
            <Navbar/>
            <div className="container" style={{paddingTop: "60px"}}>
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card custom-card shadow-lg">
                                <div className="card-header text-white" style={{background: "#a3cef1"}}>
                                    <h3 className="card-title mb-0">Информация о пользователе</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4 text-center d-flex align-items-center">
                                            <h5 className="mb-1"><strong>Имя: </strong> {user.name.firstname}</h5>
                                        </div>
                                        <div className="col-md-4 text-center d-flex align-items-center">
                                            <h5 className="mb-1"><strong>Фамилия: </strong> {user.name.lastname}</h5>
                                        </div>

                                        <div className="col-md-8">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <strong>Номер телефона: </strong>{user.phone}
                                                </li>
                                                <li className="list-group-item">
                                                    <strong>Электронная почта: </strong>{user.email}
                                                </li>
                                                <li className="list-group-item">
                                                    <strong>Имя пользователя: </strong>{user.username}
                                                </li>
                                                <li className="list-group-item">
                                                    <strong>Место жительства: </strong>{user.address.city + ' ' + user.address.street}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card-footer bg-light d-flex justify-content-between align-items-center">
                                            <button className="btn btn-sm btn-outline-primary" onClick={handleEditUser}>Редактировать</button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={handleRemoveUser}>Удалить</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}