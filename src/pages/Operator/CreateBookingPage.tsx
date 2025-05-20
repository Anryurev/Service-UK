import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../components/Navbar";
import {useNavigate, useSearchParams} from "react-router-dom";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {IBooking} from "../../models";
import {BookingForm} from "../../components/Booking/BookingForm";


export function CreateBookingPage() {

    return (
        <>
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <BookingForm isEditMode={false} />
            </div>
        </>
    )
}