import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../components/Navbar";
import {UserNote} from "../../components/User/UserNote";
import {ModalCreateUser} from "../../components/User/ModalCreateUser";
import {useNavigate} from "react-router-dom";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {Form} from "react-bootstrap";
import {SidebarMenu} from "../../components/SidebarMenu";
import {SidebarOptions} from "../../components/SidebarOptions";

export function UsersPage(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()
    const edemContext = useContext(EdembackContext)

    useEffect(() => {
        edemContext.getAllUsers()
        console.log(edemContext.state.roles)
        // eslint-disable-next-line
    }, [])

    const handleClickUser = (userId: number) => {
        navigate(`/users/${userId}`)
    }

    const filteredUsers = edemContext.state.users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
        // user.role.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return(
        <>
            { isModalOpen && <ModalCreateUser onSubmit={(newUser) => edemContext.createUser(newUser)} onClose={() => setIsModalOpen(false)}/>}
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <SidebarOptions/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <h1>Список сотрудников</h1>
                <Form.Group className="mb-4">
                    <Form.Label>Поиск по сотрудникам:</Form.Label>
                    <Form.Control
                        type="text"
                        value={searchQuery}
                        placeholder="Поиск пользователей"
                        onChange={(e) =>
                            setSearchQuery(e.target.value)
                        }
                    >
                    </Form.Control>
                </Form.Group>
                { filteredUsers.map(user =>
                    <UserNote
                        user={user}
                        onRemove={() => edemContext.deleteUser(user.id)}
                        onClick={handleClickUser}
                        key={user.id}
                    />)
                }
            </div>
        </>
    )
}