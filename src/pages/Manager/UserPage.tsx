import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {IUsers} from "../../models";
import {Navbar} from "../../components/Navbar";
import axios from "axios";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {users} from "../../data/usersdata";
import {roles} from "../../data/rolesdata";

export function UserPage(){
    const { userId } = useParams<{ userId: string }>()
    const [isEditingMod, setIsEditingMod] = useState(false)
    const edemContext = useContext(EdembackContext)
    const navigate = useNavigate()
    const [user, setUser] = useState<IUsers | undefined>({
        id: 0,
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

    async function fetchUsers(){
        // const response = await axios.get<IUsers>(`https://fakestoreapi.com/users/${userId}`)

        const user_current: IUsers | undefined = users.find(user => user.id === Number(userId));
        setUser(user_current)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if(!user){
        return (
            <div className="container" style={{paddingTop: "60px"}}>
                <h1>Пользователь не найден</h1>
            </div>
        )
    }

    const handleEditUser = () => {
        setIsEditingMod(true)
    }

    const handleRemoveUser = async (userID: number) => {
        edemContext.deleteUser(userID)
        navigate(`/users`)
    }

    const getRoleNameById = (roleId: number): string => {
        console.log("roles", edemContext.state.roles)
        const role = roles.find((role) => role.role_Id === roleId)
        return role ? role.name : "Роль не найдена"
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
                                            <h5 className="mb-1"><strong>Имя: </strong> {user.name}</h5>
                                        </div>
                                        <div className="col-md-4 text-center d-flex align-items-center">
                                            <h5 className="mb-1"><strong>Фамилия: </strong> {user.surname}</h5>
                                        </div>
                                        <div className="col-md-4 text-center d-flex align-items-center">
                                            <h5 className="mb-1"><strong>Отчество: </strong> {user.fathername}</h5>
                                        </div>

                                        <div className="col-md-8">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <strong>Номер телефона: </strong>{user.phoneNumber}
                                                </li>
                                                <li className="list-group-item">
                                                    <strong>Электронная почта: </strong>{user.email}
                                                </li>
                                                <li className="list-group-item">
                                                    <strong>Должность: </strong>{getRoleNameById(user.id_Role)}
                                                </li>
                                                <li className="list-group-item">
                                                    <strong>Дата рождения: </strong>{user.birthday}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card-footer bg-light d-flex justify-content-between align-items-center">
                                            <button className="btn btn-sm btn-outline-primary" onClick={handleEditUser}>Редактировать</button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveUser(user.id)}>Удалить</button>
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