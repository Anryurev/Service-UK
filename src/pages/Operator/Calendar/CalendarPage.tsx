import React, {useEffect, useState} from "react";
import {Navbar} from "../../../components/Navbar";
import Calendar from "../../../components/Calendar/Calendar";
import {SidebarMenu} from "../../../components/SidebarMenu";
import {IBooking} from "../../../models";

interface BookingObjectProps {
    date: Date,
    objects: IBooking[]
}

 export  const CalendarPage: React.FC = () => {
    return (
        <div className="container-fluid">
            <div className="row h-100">
                <div className="col-md-2 p-0">
                    <SidebarMenu isOpen={true}/>
                </div>
                <div className="col-md-10 h-100 overflow-auto">
                    <Calendar/>
                </div>
            </div>
            <Navbar/>

        </div>
    )
}