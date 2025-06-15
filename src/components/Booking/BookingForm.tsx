import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {IBooking, IObject} from "../../models";
import {useNavigate, useSearchParams} from "react-router-dom";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {getAuthDataFromLocalStorage} from "../../storage/loacalStorage";
import api from "../../api";

interface BookingFormProps{
    isEditMode: boolean
    bookingId?: number
}

export const BookingForm: React.FC<BookingFormProps> = ({ isEditMode, bookingId }) => {
    const [selectedObject, setSelectedObject] = useState<number | null>(null)
    const [isSelectedObject, setIsSelectedObject] = useState(false)
    const [startDate, setStartDate] = useState("2003-09-26")
    const [endDate, setEndDate] = useState("2003-09-27")
    const [status, setStatus] = useState("Бронь")
    const [searchParams] = useSearchParams()
    const edemContext = useContext(EdembackContext)
    const [dateError, setDateError] = useState("")
    const navigate = useNavigate()
    const [objects, setObjects] = useState<IObject[]>([])
    const { worker } = getAuthDataFromLocalStorage()
    const officeId = worker?.id_Office

    // Преобразует строку DD.MM.YYYY в объект Date
    const parseDateString = (dateString: string): Date => {
        const [day, month, year] = dateString.split('.').map(Number)
        return new Date(year, month - 1, day)
    };

    // Форматирует Date в строку DD.MM.YYYY
    const formatDateToString = (dateInput: string | Date): string => {
        // Преобразуем в Date, если это строка
        const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput

        // Проверка на валидность даты
        if (isNaN(date.getTime())) {
            console.error('Invalid date:', dateInput)
            return 'Некорректная дата'
        }

        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        return `${day}.${month}.${year}`
    }

    // Преобразует строку YYYY-MM-DD (из input type="date") в DD.MM.YYYY
    const formatDateInputToDisplay = (dateInput: string): string => {
        const [year, month, day] = dateInput.split('-')
        return `${day}.${month}.${year}`
    }

    // Преобразует DD.MM.YYYY в YYYY-MM-DD (для input type="date")
    const formatDisplayToDateInput = (dateDisplay: string): string => {
        const [day, month, year] = dateDisplay.split('.')
        return `${year}-${month}-${day}`
    }

    const LoadingObjects = async () => {
        const response = await api.get(`/Objects/Worker`)
        setObjects(response.data)
        console.log('response.data', response.data)
    }

    const LoadingData = async (bookingId: number) => {
        const response = await api.get(`/Booking/${bookingId}`)
        console.log('booking for edit', response.data)
        if(bookingId) {
            console.log('booking?', response.data)
            const booking = response.data
            setStartDate(formatDateToString(booking.date_Start))
            setEndDate(formatDateToString(booking.date_End))
            setSelectedObject(booking.object_id)
            setStatus(booking.status)
        }
    }

    useEffect(() => {
        if(bookingId){
            LoadingData(bookingId)
        }
    },[])

    useEffect(() => {
        const dateFromUrl = searchParams.get("date")
        if (dateFromUrl) {
            try {
                // Проверяем формат даты из URL
                if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateFromUrl)) {
                    setStartDate(dateFromUrl)
                    const dateObj = parseDateString(dateFromUrl)
                    const nextDay = new Date(dateObj)
                    nextDay.setDate(nextDay.getDate() + 1)
                    setEndDate(formatDateToString(nextDay))
                }
            } catch (error) {
                console.error("Ошибка обработки даты:", error)
                const today = formatDateToString(new Date())
                setStartDate(today)
                const tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                setEndDate(formatDateToString(tomorrow))
            }
        }

        LoadingObjects()
    }, [searchParams])

    useEffect(() => {
        const fetchObjects = async () => {
            try{
                const responseObj = await api.get(`/Objects/Worker/Dates?Start=${formatDisplayToDateInput(startDate)}&End=${formatDisplayToDateInput(endDate)}`)
                setObjects(responseObj.data)
            }catch (err){
                console.error(err)
            }
        }

        fetchObjects()
    }, [startDate, endDate])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value, 10)
        setSelectedObject(selectedId)
        setIsSelectedObject(false)
    }

    const handleEndDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedEndDate = e.target.value
        try {
            const startDateObj = parseDateString(startDate)
            const endDateObj = new Date(selectedEndDate)

            if (endDateObj < startDateObj) {
                setDateError("Дата выезда не может быть раньше даты заезда")
                return
            }

            setDateError("");
            setEndDate(formatDateInputToDisplay(selectedEndDate))
        } catch (error) {
            console.error("Ошибка обработки даты:", error)
        }
    }

    const handleStartDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedStartDate = e.target.value
        try {
            const endDateObj = parseDateString(endDate)
            const startDateObj = new Date(selectedStartDate)

            if (endDateObj < startDateObj) {
                setDateError("Дата выезда не может быть раньше даты заезда")
                return
            }

            setDateError("");
            setStartDate(formatDateInputToDisplay(selectedStartDate))
        } catch (error) {
            console.error("Ошибка обработки даты:", error)
        }
    }

    const handleSubmit = () => {
        if (!selectedObject) {
            setIsSelectedObject(true)
            return
        }

        try {
            // Создаем даты в UTC, чтобы избежать смещения
            const startDateUTC = new Date(Date.UTC(
                parseInt(startDate.split('.')[2]),
                parseInt(startDate.split('.')[1]) - 1,
                parseInt(startDate.split('.')[0])
            ))

            const endDateUTC = new Date(Date.UTC(
                parseInt(endDate.split('.')[2]),
                parseInt(endDate.split('.')[1]) - 1,
                parseInt(endDate.split('.')[0])
            ))

            const booking: IBooking = {
                id_Booking: bookingId? bookingId : -1,
                object_id: selectedObject,
                date_Start: startDateUTC,
                date_End: endDateUTC,
                status: status
            };

            console.log('Create booking', booking)
            if(isEditMode){
                edemContext.updateBooking(booking)
            }else{
                edemContext.createBooking(booking)
            }
            navigate('/home')
        } catch (error) {
            console.error("Ошибка при создании бронирования:", error)
            setDateError("Некорректный формат даты")
        }
    }

    return (
        <>
            <h1>{isEditMode? "Изменение" :"Создание"} бронирования</h1>
            {!isEditMode && <div className="mb-0">
                <label className="form-label"><h4>Дата заезда: {startDate}</h4></label>
            </div>}
            <form>
                {isEditMode && <div className="mb-2">
                    <label className="form-label" htmlFor="dateOfLeaving">Дата заезда</label>
                    <input
                        type="date"
                        id="dateOfLeaving"
                        className="form-control mb-2"
                        value={formatDisplayToDateInput(startDate)}
                        onChange={handleStartDateChange}
                    />
                    {dateError && <small style={{color: 'red'}}>{dateError}</small>}
                </div>}
                <div className="mb-2">
                    <label className="form-label" htmlFor="dateOfLeaving">Дата выезда</label>
                    <input
                        type="date"
                        id="dateOfLeaving"
                        className="form-control mb-2"
                        value={formatDisplayToDateInput(endDate)}
                        onChange={handleEndDateChange}
                        min={formatDisplayToDateInput(startDate)}
                    />
                    {dateError && <small style={{color: 'red'}}>{dateError}</small>}
                </div>
                <div className="mb-2">
                    <select
                        className="form-control"
                        value={selectedObject || ""}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Выберите объект
                        </option>
                        {objects.length > 0 && objects.map(obj => (
                            <option key={obj.id} value={obj.id}>
                                {`${obj.street}, ${obj.house}, кв. ${obj.apartment}`}
                            </option>
                        ))}
                    </select>
                    {isSelectedObject && <small style={{color: 'red'}}>Выберите объект!</small>}
                </div>
                <div className="col-12">
                    <button
                        type="button"
                        className="btn"
                        style={{backgroundColor: '#6096ba', color: 'white'}}
                        onClick={handleSubmit}
                    >
                        {isEditMode? "Изменить" : "Создать"}
                    </button>
                </div>
            </form>
        </>
    )
}