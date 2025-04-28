import React from 'react';

interface SidebarOptionsProps{
    handleClick: () => void
}

export function SidebarOptions ({handleClick}: SidebarOptionsProps) {

    return (
        <div className="position-fixed end-0 top-0 h-100"
             style={{ width: '250px', zIndex: 1000, overflowY: 'auto', paddingTop: "60px", backgroundColor: 'transparent' }}>
            <div className="d-flex flex-column h-100 p-3 border-start">
                {/* Заголовок сайдбара */}
                <div className="sidebar-header mb-4">
                    <h5 className="text-center">Опции</h5>
                </div>
                <button className="btn" style={{background: "#6096ba", color: "white"}} onClick={handleClick}>Добавить</button>

            </div>
        </div>
    )
}