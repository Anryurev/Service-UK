import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../components/Navbar";
import {useNavigate, useSearchParams} from "react-router-dom";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {IBooking} from "../../models";
import {BookingForm} from "../../components/Booking/BookingForm";
import {SidebarMenu} from "../../components/SidebarMenu";


export function CreateBookingPage() {

    return (
        <>
            <Navbar/>
            <SidebarMenu isOpen={true}/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <BookingForm isEditMode={false} />
            </div>
        </>
    )
}