import React, {useState} from "react";
import {useParams} from "react-router-dom";
import api from "../../api";

export function ResetPasswordPage() {
    const {token} = useParams<{ token: string }>()
    const [eye, setEye] = useState(false)
    const [eyeRepeat, setEyeRepeat] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepead] = useState("")
    const [doNotMatch, setDoNotMatch] = useState(false)

    const handleChangePassRepeat = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordRepead(e.target.value)
        if(passwordRepeat !== password){
            setDoNotMatch(true)
        } else{
            setDoNotMatch(false)
        }
    }

    const handleSubmit = async () => {
        await api.patch(`/UpdatePassword/${token}`)
    }

    return(
        <>
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light auth-page">
                <div className="p-4 rounded-3 shadow bg-white" style={{width: "100%", maxWidth: "450px"}}>
                    <div className="d-flex justify-content-around">
                    </div>
                    <div className="d-flex">
                        <form className="w-100">
                            <h3>Восстановление пароля</h3>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Придумайте новый пароль</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-transparent border-end-0">
                                        <i className="bi bi-lock"></i>
                                    </span>
                                    <input
                                        type={eye? "text" : "password"}
                                        className="form-control py-2 border-start-0"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="form-control-lg">
                                        { eye?
                                            <i className="bi bi-eye" onClick={() => setEye(false)}></i>
                                            : <i className="bi bi-eye-slash"  onClick={() => setEye(true)}></i>}
                                    </div>
                                </div>
                                <label htmlFor="phone" className="form-label">Подтвердите пароль</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-transparent border-end-0">
                                        <i className="bi bi-lock-fill"></i>
                                    </span>
                                    <input
                                        type={eyeRepeat? "text" : "password"}
                                        id="repeat"
                                        name="repeat"
                                        className="form-control py-2 border-start-0"
                                        value={passwordRepeat}
                                        onChange={handleChangePassRepeat}
                                    />
                                    <div className="form-control-lg">
                                        { eyeRepeat?
                                            <i className="bi bi-eye" onClick={() => setEyeRepeat(false)}></i>
                                            : <i className="bi bi-eye-slash"  onClick={() => setEyeRepeat(true)}></i>}
                                    </div>
                                </div>
                                {doNotMatch && (
                                    <div className="alert alert-danger animate__animated animate__headShake mb-3">
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