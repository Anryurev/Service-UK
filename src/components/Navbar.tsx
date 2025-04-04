import React from "react"
import {NavLink} from "react-router-dom"

export const Navbar = () => {
    return(
        <nav className="navbar fixed-top" style={{background: "#6096ba"}}>
            <div className="container-fluid">
                <NavLink className="navbar-brand"  style={{marginLeft: "2px"}} to="/home">Edem-Service</NavLink>
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