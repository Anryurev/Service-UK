import React, {ReactNode, useState} from "react";
import {Navbar} from "../components/Navbar";
import {Object} from "../components/Object";
import {objects} from "../data/objectsdata";
import {ModalCreateObject} from "../components/ModalCreateObject";
import {IObject} from "../models";

export function ObjectsPage(){
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [objectsList, setObjectList] = useState(objects)

    const handleCreateObject = (newObject: IObject) => {
        objectsList.push(newObject)
        console.log(objectsList)
    }

    const updateDataObject = (objects: IObject[]) : ReactNode => {
        return objects.map(object => <Object object={object} onRemove={handleRemove} key={object.id}/>)
    }

    const handleRemove = (objectId: number) => {
        setObjectList(objectsList.filter(item => item.id !== objectId))
    }

    return(
        <>
            {isOpenModal && <ModalCreateObject onSubmit={handleCreateObject} onClose={() => setIsOpenModal(false)} />}
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                { updateDataObject(objectsList) }
            </div>
            <div className="position-fixed bottom-0 end-0 p-3">
                <button className="btn btn-primary rounded-circle px-3 py-2" onClick={() => setIsOpenModal(true)}>
                    <i className="bi bi-plus fs-2"></i>
                </button>
            </div>
        </>
    )
}