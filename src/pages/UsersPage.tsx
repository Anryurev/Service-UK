import React, {useEffect, useState} from "react";
import {IUsers} from "../models";
import axios from "axios";
import {Navbar} from "../components/Navbar";
import {User} from "../components/User";
import {ModalCreateUser} from "../components/ModalCreateUser";

export function UsersPage(){
    const [users, setUsers] = useState<IUsers[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    async function fetchUsers(){
        const response = await axios.get<IUsers[]>('https://fakestoreapi.com/users')
        setUsers(response.data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleCreateUser = (newUser: IUsers) => {
        setUsers((prev) => [...prev, newUser])
    }


    return(
        <>
        { isModalOpen && <ModalCreateUser onSubmit={handleCreateUser} onClose={() => setIsModalOpen(false)}/>}
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                { users.map(user => <User user={user} key={user.id + user.v}/>) }
            </div>
            <div className="position-fixed bottom-0 end-0 p-3">
                <button className="btn btn-primary rounded-circle px-3 py-2" onClick={() => setIsModalOpen(true)}>
                    <i className="bi bi-plus fs-3"></i>
                </button>
            </div>
        </>
    )
}