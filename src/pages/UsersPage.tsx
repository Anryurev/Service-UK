import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../components/Navbar";
import {User} from "../components/User/User";
import {ModalCreateUser} from "../components/User/ModalCreateUser";
import {useNavigate} from "react-router-dom";
import {EdembackContext} from "../context/edemback/EdembackContext";

export function UsersPage(){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    const edemContext = useContext(EdembackContext)

    useEffect(() => {
        edemContext.getAllUsers()
        console.log('useEffect')
        // eslint-disable-next-line
    }, [])

    const handleClickUser = (userId: number) => {
        navigate(`/users/${userId}`)
    }

    return(
        <>
        { isModalOpen && <ModalCreateUser onSubmit={(newUser) => edemContext.createUser(newUser)} onClose={() => setIsModalOpen(false)}/>}
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                { edemContext.state.users.map(user =>
                    <User
                        user={user}
                        onRemove={() => edemContext.deleteUser(user.id)}
                        onClick={handleClickUser}
                        key={user.id + user.v}
                    />)
                }
            </div>
            <div className="position-fixed bottom-0 end-0 p-3">
                <button className="btn btn-primary rounded-circle px-1 py-0" onClick={() => setIsModalOpen(true)}>
                    <i className="bi bi-plus fs-3"></i>
                </button>
            </div>
        </>
    )
}