import React, {ReactNode, useState} from "react";
import {Navbar} from "../components/Navbar";
import {Object} from "../components/Object/Object";
import {objects} from "../data/objectsdata";
import {ModalCreateObject} from "../components/Object/ModalCreateObject";
import {IObject} from "../models";
import {useNavigate} from "react-router-dom";

export function ObjectsPage(){
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [objectsList, setObjectList] = useState(objects)
    const navigate = useNavigate()

    const handleCreateObject = (newObject: IObject) => {
        objectsList.push(newObject)
        console.log(objectsList)
    }

    const handleClickObject = (objectId: number) => {
        navigate(`/objects/${objectId}`)
    }

    const updateDataObject = (objects: IObject[]) : ReactNode => {
        return objects.map(object => <Object object={object}
                                             onRemove={handleRemove}
                                             onClick={handleClickObject}
                                             key={object.id}/>
        )
    }

    const handleRemove = (objectId: number) => {
        setObjectList((prev) => prev.filter(object => object.id !== objectId))
    }

    return(
        <>
            {isOpenModal && <ModalCreateObject onSubmit={handleCreateObject} onClose={() => setIsOpenModal(false)} />}
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                { updateDataObject(objectsList) }
            </div>
            <div className="position-fixed bottom-0 end-0 p-3">
                <button className="btn btn-primary rounded-circle px-1 py-0" onClick={() => setIsOpenModal(true)}>
                    <i className="bi bi-plus fs-2"></i>
                </button>
            </div>
        </>
    )
}