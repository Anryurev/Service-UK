import React, {useEffect, useState} from "react";
import {Navbar} from "../../components/Navbar";
import {useParams} from "react-router-dom";
import api from "../../api";
import {IBooking} from "../../models";
import {BookingForm} from "../../components/Booking/BookingForm";

export function EditBookingPage(){
    const { bookingId } = useParams<{ bookingId: string }>()
    const [error, setError] = useState(false)
    const [booking, setBooking] = useState<IBooking>({
        id_Booking: 0,
        object_id: 0,
        date_Start: new Date(),
        date_End: new Date(),
        status: ""
    })

    const LoadingData = async (bookingId: string) => {
        const response = await api.get(`/Booking/${bookingId}`)
        setBooking(response.data)
    }

    useEffect(() => {
        if(bookingId){
            LoadingData(bookingId)
        }
        else{
            setError(true)
        }
    },[])

    if(error) <div>Бронирование не найдено</div>

    return(
        <>
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
               <BookingForm isEditMode={true}/>
            </div>
        </>
    )
}