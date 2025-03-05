import React from "react";
import {Navbar} from "../components/Navbar";
import {Object} from "../components/Object";
import {objects} from "../data/objectsdata";

export function ObjectsPage(){
    return(
        <>
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                { objects.map(object => <Object object={object} key={object.id}/>) }
            </div>
            <div className="position-fixed bottom-0 end-0 p-3">
                <button className="btn btn-primary rounded-circle p-1">
                    <i className="bi bi-plus fs-2"></i>
                </button>
            </div>
        </>
    )
}