import React from "react";
import {Navbar} from "../components/Navbar";

export function Calendar() {
    return (
        <>
            <Navbar/>
            <div style={{paddingTop: '56px'}}>
                <div className="container-fluid" style={{ minHeight: '100vh' }}>
                    <h1 style={{color: "black"}}>
                        Тут будет шахматка
                    </h1>
                </div>
            </div>
        </>
    )
}