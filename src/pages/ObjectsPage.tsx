import React, {ReactNode, useContext, useEffect, useState} from "react";
import {Navbar} from "../components/Navbar";
import {Object} from "../components/Object/Object";
import {objects} from "../data/objectsdata";
import {ModalCreateObject} from "../components/Object/ModalCreateObject";
import {IObject} from "../models";
import {useNavigate} from "react-router-dom";
import {EdembackContext} from "../context/edemback/EdembackContext";

export function ObjectsPage(){
    const [isOpenModal, setIsOpenModal] = useState(false)
    const navigate = useNavigate()
    const edemContext = useContext(EdembackContext)

    useEffect(() => {
        edemContext.getAllObjects()
    }, [])

    const handleCreateObject = (newObject: IObject) => {
        objects.push(newObject)
        console.log(objects)
    }

    const handleClickObject = (objectId: number) => {
        navigate(`/objects/${objectId}`)
    }

    return(
        <>
            {isOpenModal && <ModalCreateObject onSubmit={handleCreateObject} onClose={() => setIsOpenModal(false)} />}
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                { edemContext.state.objects.map(object => <Object object={object}
                                                                  onRemove={() => edemContext.deleteObject(object.id)}
                                                                  onClick={handleClickObject}
                                                                  key={object.id}
                    />
                ) }
            </div>
            <div className="position-fixed bottom-0 end-0 p-3">
                <button className="btn btn-primary rounded-circle px-1 py-0" onClick={() => setIsOpenModal(true)}>
                    <i className="bi bi-plus fs-2"></i>
                </button>
            </div>
        </>
    )
}