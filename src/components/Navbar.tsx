import React, {useContext, useEffect} from "react"
import {NavLink} from "react-router-dom"
import {UserContext} from "../context/userContext/UserContext";

export const Navbar = () => {
    const userContext = useContext(UserContext)

    useEffect(() => {
        console.log('user', userContext?.user)
    }, [])

    return(
        <nav className="navbar fixed-top" style={{background: "#6096ba"}}>
            <div className="container-fluid">
                <NavLink className="navbar-brand"  style={{marginLeft: "2px"}} to="/home">Сервис УК</NavLink>
                <div>
                    {userContext?.user?.surname} {userContext?.user?.name} {userContext?.user?.fathername}
                </div>
                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Edem-Service</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </nav>
    )

}