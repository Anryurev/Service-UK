import React, {useContext, useEffect} from "react"
import {NavLink} from "react-router-dom"
import {WorkerContext} from "../context/workerContext/WorkerContext";

export const Navbar = () => {
    const workerContext = useContext(WorkerContext)

    return(
        <nav className="navbar fixed-top" style={{background: "#6096ba"}}>
            <div className="container-fluid">
                <NavLink className="navbar-brand"  style={{marginLeft: "2px"}} to="/home">Сервис УК</NavLink>
                <div>
                    {workerContext?.worker?.surname} {workerContext?.worker?.name} {workerContext?.worker?.fathername}
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