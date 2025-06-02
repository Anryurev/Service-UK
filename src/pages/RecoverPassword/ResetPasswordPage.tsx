import React, {useEffect, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import api from "../../api";

export function ResetPasswordPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [eye, setEye] = useState(false)
    const [eyeRepeat, setEyeRepeat] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepead] = useState("")
    const [doNotMatch, setDoNotMatch] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setDoNotMatch(passwordRepeat !== password);
    }, [password, passwordRepeat])

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handlePasswordRepeatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordRepead(e.target.value)
    }

    const handleSubmit = async () => {
        console.log('token', token)
        await api.patch(`/UpdatePassword/${token}?password=${password}`)
        navigate('/')
    }

    return(
        <>
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light auth-page">
                <div className="p-4 rounded-3 shadow bg-white" style={{width: "100%", maxWidth: "450px"}}>
                    <div className="d-flex justify-content-around">
                    </div>
                    <div className="d-flex">
                        <form className="w-100">
                            <h3 className="method-send" style={{fontSize: "30px"}}>Восстановление пароля</h3>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Придумайте новый пароль</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-transparent border-end-0">
                                      <i className="bi bi-lock"></i>
                                    </span>
                                    <input
                                        type={eye ? "text" : "password"}
                                        className="form-control py-2 border-start-0"
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setEye(!eye)}
                                    >
                                        <i className={`bi ${eye ? "bi-eye-slash" : "bi-eye"}`}></i>
                                    </button>
                                </div>

                                <label htmlFor="repeat" className="form-label">Подтвердите пароль</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-transparent border-end-0">
                                      <i className="bi bi-lock-fill"></i>
                                    </span>
                                    <input
                                        type={eyeRepeat ? "text" : "password"}
                                        id="repeat"
                                        className={`form-control py-2 border-start-0 ${doNotMatch ? "is-invalid" : ""}`}
                                        value={passwordRepeat}
                                        onChange={handlePasswordRepeatChange}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setEyeRepeat(!eyeRepeat)}
                                    >
                                        <i className={`bi ${eyeRepeat ? "bi-eye-slash" : "bi-eye"}`}></i>
                                    </button>
                                </div>

                                {doNotMatch && (
                                    <div className="alert alert-danger animate__animated animate__headShake">
                                        <i className="bi bi-exclamation-circle me-2"></i>
                                        Пароли не совпадают!
                                    </div>
                                )}
                            </div>
                            <button type="button"
                                    className="btn btn-primary w-100"
                                    disabled={doNotMatch}
                                    onClick={handleSubmit}
                            >
                                Подтвердить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}