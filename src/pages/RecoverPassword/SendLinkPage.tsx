import React, {useState} from "react";
import api from "../../api";

export function SendLinkPage() {
    const [isEmail, setIsEmail] = useState(true)
    const [phone, setPhone] = useState("+7")
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)
    const [isSend, setIsSend] = useState(false)

    const formatPhone = (value: string) => {
        const numbers = value.replace(/\D/g, '').substring(1)
        let formatted = '+7'

        if (numbers.length > 0) {
            formatted += ` (${numbers.substring(0, 3)}`
        }
        if (numbers.length > 3) {
            formatted += `) ${numbers.substring(3, 6)}`
        }
        if (numbers.length > 6) {
            formatted += `-${numbers.substring(6, 8)}`
        }
        if (numbers.length > 8) {
            formatted += `-${numbers.substring(8, 10)}`
        }

        return formatted
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        const name = e.target.name
        if (name === "phone"){
            console.log(1)
            if (input.startsWith('+7') || input === '+') {
                setPhone(formatPhone(input));
            }
        }
        if (name === "email"){
            console.log(2)
            setEmail(input)
        }

    }

    const cleanPhoneNumber = (formattedPhone: string): string => {
        // Удаляем всё, кроме цифр и +
        return formattedPhone.replace(/[^\d+]/g, '')
    }

    const handleSubmit = async () => {
        const requestPasswordReset = {
            method: isEmail? "Email" : "Телеграмм",
            value: isEmail? email : cleanPhoneNumber(phone),
        }
        try{
            setError(false)
            const response = await api.post(`/request-password-reset`, requestPasswordReset)
            setIsSend(true)
        }catch (err){
            console.error(err)
            setError(true)
        }

    }

    return(
        <>
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light auth-page">
                <div className="p-4 rounded-3 shadow bg-white" style={{width: "100%", maxWidth: "450px"}}>
                    {!isSend &&
                    <>
                        <div className="d-flex justify-content-around">
                            <i className="bi bi-at method-send" onClick={() => setIsEmail(true)}></i>
                            <i className="bi bi-telegram method-send" onClick={() => setIsEmail(false)}></i>
                        </div>
                        <div className="d-flex">
                            <form>
                                <div className="mb-3">
                                {isEmail? (
                                    <>
                                        <label htmlFor="email" className="form-label">Электронная почта</label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-transparent border-end-0">
                                            <i className="bi bi-at text-primary"></i>
                                            </span>
                                            <input
                                                type="email"
                                                placeholder="youremail@mail.ru"
                                                className="form-control py-2 border-start-0"
                                                id="email"
                                                name="email"
                                                value={email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div id="emailHelp" className="form-text">
                                            На электронную почту мы отправим сслыку для сброса пароля
                                        </div>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <label htmlFor="phone" className="form-label">Номер телефона</label>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text bg-transparent border-end-0">
                                                <i className="bi bi-telephone text-primary"></i>
                                            </span>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                placeholder="+7 (123) 456-78-90"
                                                className="form-control py-2 border-start-0"
                                                value={phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div id="emailHelp" className="form-text">
                                            По номеру телефона в Telegram мы отправим сслыку для сброса пароля
                                        </div>
                                    </>
                                )}
                                </div>
                        {
                            error && (
                                <div className="alert alert-danger animate__animated animate__headShake mb-3">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {isEmail ? "Неверный формат почты!" : "Неверный формат номера телефона!"}
                                </div>
                            )
                        }
                                <button type="button"
                                        className="btn btn-primary w-100"
                                        onClick={handleSubmit}
                                >
                                    Отправить
                                </button>
                            </form>
                        </div>
                    </>}

                    {isSend &&
                        <div className="alert alert-info animate__animated animate__headShake mb-3">
                            <i className="bi bi-exclamation-circle me-2"></i>
                            {isEmail? "Ссылка направлена на Вашу электронную почту" : "Ссылка отправлена на Ваш аккаунт Telegram. "}
                            Страница может быть закрыта.
                        </div>
                    }
                </div>
            </div>
        </>
    )
}