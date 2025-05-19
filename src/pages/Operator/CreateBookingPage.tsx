import React, {useContext, useEffect, useState} from "react";
import {Navbar} from "../../components/Navbar";
import {useNavigate, useSearchParams} from "react-router-dom";
import {EdembackContext} from "../../context/edemback/EdembackContext";
import {IBooking} from "../../models";


export function CreateBookingPage() {
    const [selectedObject, setSelectedObject] = useState<number | null>(null)
    const [isSelectedObject, setIsSelectedObject] = useState(false)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [searchParams] = useSearchParams()
    const edemContext = useContext(EdembackContext)
    const [dateError, setDateError] = useState("")
    const navigate = useNavigate()

    // Преобразует строку DD.MM.YYYY в объект Date
    const parseDateString = (dateString: string): Date => {
        const [day, month, year] = dateString.split('.').map(Number)
        return new Date(year, month - 1, day)
    };

    // Форматирует Date в строку DD.MM.YYYY
    const formatDateToString = (date: Date): string => {
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
    };

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
        edemContext.getAllObjects()
    }, [searchParams])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value, 10)
        setSelectedObject(selectedId)
        setIsSelectedObject(false)
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                id_Booking: -1,
                object_id: selectedObject,
                date_Start: startDateUTC,
                date_End: endDateUTC,
                status: 'Бронь'
            };

            console.log('Create booking', booking)
            edemContext.createBooking(booking)
            navigate('/home')
        } catch (error) {
            console.error("Ошибка при создании бронирования:", error)
            setDateError("Некорректный формат даты")
        }
    }

    return (
        <>
            <Navbar/>
            <div className="container-fluid w-50" style={{paddingTop: '65px'}}>
                <h1>Создание бронирования</h1>
                <div className="mb-0">
                    <label className="form-label"><h4>Дата заезда: {startDate}</h4></label>
                </div>
                <form>
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
                            {edemContext.state.objects.map(obj => (
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
                            Создать
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}