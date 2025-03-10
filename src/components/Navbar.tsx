import React from "react"
import {NavLink} from "react-router-dom"

export const Navbar = () => {
    return(
        <nav className="navbar fixed-top" style={{background: "#6096ba"}}>
            <div className="container-fluid">
                <NavLink className="navbar-brand"  style={{marginLeft: "2px"}} to="/home">Edem-Service</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Edem-Service</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                    </div>

                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/home">Календарь</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/objects">Объекты</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/users">Список работников</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-danger" to="/">Выйти</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )

}