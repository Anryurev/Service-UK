import React from "react";
import {Navbar} from "../components/Navbar";
import {CalendarCard} from "../components/Calendar/CalendarCard";
import {objects} from "../data/objectsdata";
import {useNavigate} from "react-router-dom";



export function CalendarPage() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/booking/create`)
    }

    return (
        <>
            <Navbar/>
            <div style={{paddingTop: '56px'}}>
                <div className="container-fluid" style={{ minHeight: '100vh' }}>
                    <h1 style={{color: "black"}}>
                        <CalendarCard objects={objects}/>
                    </h1>
                </div>
            </div>
            <div className="position-fixed bottom-0 end-0 p-3">
                <button className="btn btn-primary rounded-circle px-1 py-0" onClick={handleClick}>
                    <i className="bi bi-plus fs-2"></i>
                </button>
            </div>
        </>
    )
}