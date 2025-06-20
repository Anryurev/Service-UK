import React from 'react';
import {getAuthDataFromLocalStorage} from "../storage/loacalStorage";

interface SidebarOptionsProps{
    title: string,
    handleClick: () => void
}

export function SidebarOptions ({title, handleClick}: SidebarOptionsProps) {
    const {role} = getAuthDataFromLocalStorage()

    return (
        <div className="position-fixed end-0 top-0 h-100 col-sm-0"
             style={{ width: '250px', zIndex: 1000, overflowY: 'auto', paddingTop: "60px", backgroundColor: 'transparent' }}>
            <div className="d-flex flex-column h-100 p-3 border-start">
                {Number(role?.levelImportant) < 3 && <button className="btn" style={{background: "#6096ba", color: "white"}}
                         onClick={handleClick}>Добавить {title}</button>}
            </div>
        </div>
    )
}