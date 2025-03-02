import React from "react";
import {Navbar} from "../components/Navbar";

export function Objects(){
    return(
        <>
            <Navbar/>
            <div style={{paddingTop: '56px'}}>
                <div className="container-fluid" style={{ minHeight: '100vh' }}>
                    <h1 style={{color: "black"}}>
                        Тут будут объекты
                    </h1>
                </div>
            </div>
        </>
    )
}